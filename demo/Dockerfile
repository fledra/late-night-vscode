# 1. Base Image and Metadata
FROM node:20-slim AS builder

LABEL maintainer='dev-tester@example.com'
LABEL version='2.1.0'
LABEL description='Theme stress test for Docker'

# 2. Environment Variables and Arguments
ARG BUILD_ENV=production
ENV NODE_ENV=${BUILD_ENV}
ENV APP_HOME=/usr/src/app

# 3. Working Directory and Permissions
WORKDIR $APP_HOME

# 4. Layer Optimization (Copying package files first)
COPY package*.json ./

# Testing shell command execution and multi-line instructions
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --only=${BUILD_ENV}

# 5. File Operations
COPY . .

# 6. Build Stage Logic (Conditional-like behavior)
RUN if [ "$BUILD_ENV" = "production" ]; then \
      npm run build; \
    else \
      npm run dev-build; \
    fi

# 7. Multi-stage Build (Production Image)
FROM nginx:alpine

# Copying from previous stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 8. Networking and Execution
EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
