<?php
/**
 * @file theme-test.php
 * Testing PHP 8.x features, attributes, and HTML integration.
 */

namespace App\Core\Themes;

use Exception;
use InvalidArgumentException;

// 1. Attributes and Enums (PHP 8.1+)
enum ThemeMode: string {
    case Dark = 'dark';
    case Light = 'light';
}

#[Attribute]
class ThemeConfig {
    public function __construct(
        public string $palette = 'DeepRedBlue'
    ) {}
}

// 2. Class with Constructor Property Promotion
class DeveloperProfile {
    private array $logs = [];

    public function __construct(
        public int $id,
        public string $username,
        protected ThemeMode $mode = ThemeMode::Dark,
        private ?string $bio = null
    ) {
        $this->logs[] = "Initialized profile for {$this->username}";
    }

    /**
     * Testing Nullsafe operator and Match expression
     */
    public function getStatus(): string {
        // PHP 8.0 match expression
        return match($this->mode) {
            ThemeMode::Dark => 'Night Mode Active',
            ThemeMode::Light => 'Day Mode Active',
            default => 'Unknown State',
        };
    }

    public function logAction(string $message): void {
        // Heredoc string testing
        $timestamp = date('Y-m-d H:i:s');
        $this->logs[] = <<<LOG
        ACTION_LOG: {$message}
        TIMESTAMP: {$timestamp}
        LOG;
    }
}

class SomeDev extends DeveloperProfile {
    public function myFunc() {
        parent::getStatus();
    }
}

// 3. Logic and Error Handling
try {
    $dev = new DeveloperProfile(101, 'Dev_Admin');
    $dev->logAction('Testing theme colors');
} catch (Exception | InvalidArgumentException $e) {
    error_log($e->getMessage());
}

?>

<div class='php-container'>
    <?php if ($dev->id === 101): ?>
        <header class='active-header'>
            <h1>Welcome, <?= htmlspecialchars($dev->username) ?></h1>
            <p>Status: <strong><?php echo $dev->getStatus(); ?></strong></p>
        </header>
    <?php else: ?>
        <p>Guest Access Only</p>
    <?php endif; ?>

    <ul class='palette-list'>
        <?php
        $colors = ['#1a3a4a', '#5a1d1d', '#f0f0f0'];
        foreach ($colors as $index => $hex):
        ?>
            <li style='color: <?= $hex ?>'>
                Color #<?= $index + 1 ?>: <?= $hex ?>
            </li>
        <?php endforeach; ?>
    </ul>
</div>
