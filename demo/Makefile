# 1. Variables and Assignment
CC := gcc
CFLAGS := -Wall -Wextra -O2
LDFLAGS := -lm

APP_NAME := theme_tester
SRC_DIR := src
OBJ_DIR := build
SOURCES := $(wildcard $(SRC_DIR)/*.c)
OBJECTS := $(SOURCES:$(SRC_DIR)/%.c=$(OBJ_DIR)/%.o)

# 2. Phony Targets (Commands that aren't files)
.PHONY: all clean run help

all: $(APP_NAME)

# 3. Pattern Rules and Automatic Variables
# Testing how the theme handles '$@' and '$<'
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c | $(OBJ_DIR)
	@echo "Compiling $<..."
	$(CC) $(CFLAGS) -c $< -o $@

# 4. Main Build Target
$(APP_NAME): $(OBJECTS)
	$(CC) $(OBJECTS) -o $@ $(LDFLAGS)

# 5. Directory Creation
$(OBJ_DIR):
	mkdir -p $(OBJ_DIR)

# 6. Shell Commands and Conditionals
run: all
	@echo "Launching $(APP_NAME)..."
	./$(APP_NAME)

clean:
	@echo "Cleaning up..."
	rm -rf $(OBJ_DIR) $(APP_NAME)

# 7. Complexity: Functions and Logic
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell uname -s)
endif

help:
	@echo "OS detected: $(DETECTED_OS)"
	@echo "Available targets:"
	@echo "  all    - Build the application"
	@echo "  clean  - Remove build artifacts"
