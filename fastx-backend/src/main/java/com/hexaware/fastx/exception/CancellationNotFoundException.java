package com.hexaware.fastx.exception;

public class CancellationNotFoundException extends RuntimeException {

    public CancellationNotFoundException(String message) {
        super(message);
    }
}
