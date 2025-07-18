package com.hexaware.fastx.service;

import com.hexaware.fastx.dto.PaymentDTO;

public interface PaymentService {

    PaymentDTO makePayment(int bookingId, String method);

    PaymentDTO getPaymentByBookingId(int bookingId);
}
