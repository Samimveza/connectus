<?php

/**
 * Simple logging utility
 */
class Logger {
    private static $logFile = 'redirect.log';
    private static $enabled = false; // Set to true to enable logging
    
    /**
     * Log a message with timestamp
     * 
     * @param string $message Message to log
     * @param mixed $data Optional data to log
     * @return void
     */
    public static function log($message, $data = null) {
        if (!self::$enabled) {
            return;
        }
        
        $timestamp = date('Y-m-d H:i:s');
        $logMessage = "[{$timestamp}] {$message}";
        
        if ($data !== null) {
            $logMessage .= ": " . self::formatData($data);
        }
        
        file_put_contents(self::$logFile, $logMessage . PHP_EOL, FILE_APPEND);
    }
    
    /**
     * Format data for logging
     * 
     * @param mixed $data Data to format
     * @return string Formatted data
     */
    private static function formatData($data) {
        if (is_array($data) || is_object($data)) {
            return json_encode($data);
        }
        
        return (string) $data;
    }
    
    /**
     * Set logging state
     * 
     * @param bool $state Enable or disable logging
     * @return void
     */
    public static function setEnabled($state) {
        self::$enabled = (bool) $state;
    }
} 