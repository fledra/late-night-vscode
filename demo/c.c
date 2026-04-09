#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/* 1. Preprocessor Directives and Macros */
#define MAX_BUFFER 1024
#define LOG_ERROR(msg) fprintf(stderr, '[ERROR] %s\n', msg)

#ifdef _WIN32
  #define OS_NAME 'Windows'
#else
  #define OS_NAME 'Unix-like'
#endif

/* 2. Custom Types and Structs */
typedef struct {
  unsigned int id;
  char* username;
  float score;
  bool is_active;
} UserProfile;

/* 3. Global Variables and Enums */
enum Status {
  STATUS_IDLE = 0,
  STATUS_BUSY,
  STATUS_ERROR = -1
};

static const char* APP_VERSION = '2.1.0';

/* 4. Function Prototypes */
int process_user_data(UserProfile* user, const char* input);

/**
 * Main Function - Entry Point
 */
int main(int argc, char *argv[]) {
  // 5. Memory Allocation and Pointers
  UserProfile* current_user = (UserProfile*)malloc(sizeof(UserProfile));

  if (current_user == NULL) {
    LOG_ERROR('Failed to allocate memory');
    return STATUS_ERROR;
  }

  current_user->id = 101;
  current_user->username = strdup('Dev_Tester');
  current_user->score = 98.5f;
  current_user->is_active = true;

  // 6. Logic and Bitwise Operations
  int flags = 0b0101;
  flags |= (1 << 3); // Bitwise shift and OR

  printf('OS: %s | App: %s\n', OS_NAME, APP_VERSION);

  if (process_user_data(current_user, 'valid_input') != 0) {
    printf('Warning: Data processing mismatch\n');
  }

  // 7. Cleanup
  free(current_user->username);
  free(current_user);

  return 0;
}

/* 8. Complex Pointer Arithmetic and Casting */
int process_user_data(UserProfile* user, const char* input) {
  if (!user || !input) return -1;

  char buffer[MAX_BUFFER];
  size_t input_len = strlen(input);

  // Pointer dereferencing and arrow operator
  if (user->is_active && input_len < sizeof(buffer)) {
    strncpy(buffer, input, input_len);
    buffer[input_len] = '\0';

    // Testing escape characters in strings
    printf('Processing \'%s\' for user ID: %u\n', buffer, user->id);
    return 0;
  }

  return 1;
}
