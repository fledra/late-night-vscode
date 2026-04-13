package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

// 1. Interfaces and Types
type ThemeManager interface {
	Apply(name string) error
	GetActive() string
}

// 2. Structs with Tags (storage.type / variable.other.member)
type Config struct {
	ID        int       `json:"id"`
	Palette   string    `json:"palette" shadow:"true"`
	CreatedAt time.Time `json:"created_at"`
}

// 3. Constant and Variable Blocks
const (
	MaxRetries = 3
	DefaultHex = "#1a3a4a" // Blue accent
)

var (
	ErrThemeNotFound = errors.New("theme not found in registry")
)

// 4. Functions with Multiple Return Values and Pointers
func NewConfig(id int) (*Config, error) {
	if id <= 0 {
		return nil, fmt.Errorf("invalid id: %d", id)
	}

	return &Config{
		ID:      id,
		Palette: "DeepRedBlue",
	}, nil
}

// 5. Methods on Structs (Receiver functions)
func (c *Config) Apply(ctx context.Context) error {
	// 6. Channels and Concurrency
	done := make(chan bool)

	go func() {
		fmt.Printf("Applying %s palette...\n", c.Palette)
		time.Sleep(100 * time.Millisecond)
		done <- true
	}()

	select {
	case <-done:
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func main() {
	// 7. Short Variable Declarations and Control Flow
	cfg, err := NewConfig(1)
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	if err := cfg.Apply(ctx); err != nil {
		fmt.Printf("Failed: %v\n", err)
	} else {
		fmt.Println("Success!")
	}
}
