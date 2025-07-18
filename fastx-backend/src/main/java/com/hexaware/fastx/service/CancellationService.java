package com.hexaware.fastx.service;

import com.hexaware.fastx.dto.CancellationDTO;

public interface CancellationService {

    CancellationDTO cancelBooking(int bookingId, String reason);

    CancellationDTO getCancellationByBookingId(int bookingId);
}
