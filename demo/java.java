package com.redblue.theme;

import java.util.*;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.concurrent.CompletableFuture;
import javax.annotation.processing.Generated;

/**
 * Testing Java Interface syntax and Documentation tags.
 */
public interface IThemeManager {
    // 1. Constant fields
    String DEFAULT_PALETTE = "DEEP_RED_BLUE";

    // 2. Method Signatures
    void applyTheme(String themeName);

    Optional<String> getActivePalette();

    // 3. Default and Static methods (Java 8+)
    default boolean isDefault() {
      return getActivePalette()
          .map(p -> p.equals(DEFAULT_PALETTE))
          .orElse(false);
    }
}
/**
 * Main implementation testing Annotations, Streams, and Records.
 */
@Generated("ThemeGenerator")
public class ThemeService<T extends IThemeManager> extends AbstractService {

    private final List<String> history = new ArrayList<>();
    private final T manager;

    // 1. Records (Java 14+) - A great test for data-class highlighting
    public record ThemeMetadata(int id, String author, boolean isPremium) {}

    public ThemeService(T manager) {
        this.manager = Objects.requireNonNull(manager);
    }

    // 2. Modern Switch Expressions (Java 14+)
    public String getHexCode(String colorName) {
        return switch (colorName.toLowerCase()) {
            case "red" -> "#5a1d1d";
            case "blue" -> "#1a3a4a";
            case "grey", "gray" -> "#f0f0f0";
            default -> throw new IllegalArgumentException("Unknown color: " + colorName);
        };
    }

    // 3. Streams and Lambdas
    public List<String> filterHistory(String query) {
        return history.stream()
            .filter(entry -> entry.contains(query))
            .map(String::toUpperCase) // Method reference test
            .collect(Collectors.toList());
    }

    // 4. Exception Handling
    public void processTheme(ThemeMetadata meta) throws Exception {
        try {
            if (meta.isPremium()) {
                System.out.println("Processing premium theme by " + meta.author());
            }
        } catch (NullPointerException | IllegalStateException e) {
            // Multi-catch block test
            throw new Exception("Theme processing failed", e);
        } finally {
            history.add("Processed: " + meta.id());
        }
    }
}
