#ifndef THEME_STRESS_TEST_H
#define THEME_STRESS_TEST_H

/** * 1. Include Guards and System Includes
 * Testing preprocessor logic and path strings
 */
#include <stdint.h>
#include <stddef.h>

#ifdef __cplusplus
extern 'C' {
#endif

/* 2. Macro Definitions & Constants */
#define API_VERSION '1.0.4'
#define MAX_USERS 512
#define IS_VALID(x) ((x) != NULL && (x)->status == 0)

/* 3. Enum Definitions */
typedef enum {
  LOG_LEVEL_DEBUG = 0,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARN,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL = 99
} LogLevel;

/* 4. Complex Struct & Union Nesting */
typedef struct {
  uint32_t seconds;
  uint32_t microseconds;
} TimeStamp;

typedef struct _Session {
  uint64_t session_id;
  char token[64];

  // Nested Anonymous Union
  union {
    uint32_t ipv4;
    uint8_t ipv6[16];
  } address;

  TimeStamp last_seen;
  LogLevel current_log;
} Session;

/* 5. Function Prototypes (Declarations) */
/**
 * @brief Initializes the session manager
 * @param config_path Path to the .toml config file
 * @return 0 on success, non-zero error code otherwise
 */
extern int session_init(const char* config_path);

extern Session* session_create(const char* username, LogLevel level);

extern void session_destroy(Session* session);

/* 6. Inline Functions (Common in modern headers) */
static inline bool session_is_active(const Session* s) {
  return (s != NULL && s->session_id > 0);
}

/* 7. Variadic Functions and Attributes */
extern void log_message(LogLevel level, const char* format, ...)
  __attribute__ ((format (printf, 2, 3)));

#ifdef __cplusplus
}
#endif

#endif /* THEME_STRESS_TEST_H */
