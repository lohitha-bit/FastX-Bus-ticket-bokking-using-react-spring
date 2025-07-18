package com.hexaware.fastx.test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.fastx.dto.AmenityDTO;
import com.hexaware.fastx.dto.RouteDTO;
import com.hexaware.fastx.dto.SeatDTO;
import com.hexaware.fastx.dto.UserDTO;
import com.hexaware.fastx.entity.Amenity;
import com.hexaware.fastx.entity.Bus;
import com.hexaware.fastx.entity.Route;
import com.hexaware.fastx.entity.Seat;
import com.hexaware.fastx.entity.User;
import com.hexaware.fastx.repository.AmenityRepository;
import com.hexaware.fastx.repository.BusRepository;
import com.hexaware.fastx.repository.RouteRepository;
import com.hexaware.fastx.repository.SeatRepository;
import com.hexaware.fastx.repository.UserRepository;
import com.hexaware.fastx.serviceImplementation.AmenityServiceImplementation;
import com.hexaware.fastx.serviceImplementation.RouteServiceImplementation;
import com.hexaware.fastx.serviceImplementation.SeatServiceImplementation;
import com.hexaware.fastx.serviceImplementation.UserServiceImplementation;

@SpringBootTest
public class EntityServiceTest {

    @InjectMocks
    private AmenityServiceImplementation amenityService;

    @InjectMocks
    private UserServiceImplementation userService;

    @InjectMocks
    private SeatServiceImplementation seatService;

    @InjectMocks
    private RouteServiceImplementation routeService;

    @Mock
    private AmenityRepository amenityRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SeatRepository seatRepository;

    @Mock
    private RouteRepository routeRepository;

    @Mock
    private BusRepository busRepository;

    @Mock
    private ModelMapper modelMapper;

    // If your UserServiceImplementation uses PasswordEncoder, mock it here:
    @Mock
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    private AmenityDTO amenityDTO;
    private Amenity amenity;

    private UserDTO userDTO;
    private User user;

    private SeatDTO seatDTO;
    private Seat seat;

    private Bus bus;

    private RouteDTO routeDTO;
    private Route route;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Inject PasswordEncoder mock into userService manually (if no constructor injection)
        // If you have constructor injection, this will happen automatically.
        // Example (only if needed):
        // ReflectionTestUtils.setField(userService, "passwordEncoder", passwordEncoder);

        // Amenity setup
        amenityDTO = new AmenityDTO();
        amenityDTO.setName("AC");
        amenityDTO.setDescription("Air Conditioner");

        amenity = new Amenity();
        amenity.setAmenityId(1);
        amenity.setName("AC");
        amenity.setDescription("Air Conditioner");

        // User setup
        userDTO = new UserDTO();
        userDTO.setEmail("test@example.com");
        userDTO.setName("John");
        userDTO.setGender("Male");
        userDTO.setPassword("secret123");
        userDTO.setRole("passenger");
        userDTO.setContactNumber("9876543210");

        user = new User();
        user.setUserId(1);
        user.setName("John");
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword"); // Use encoded password in entity
        user.setGender("Male");
        user.setContactNumber("9876543210");
        user.setRole("passenger");

        // Bus setup (needed for seat tests)
        bus = new Bus();
        bus.setBusId(101);
        // Set other bus fields if needed

        // Seat setup
        seatDTO = new SeatDTO();
        seatDTO.setSeatNumber("A1");
        seatDTO.setSeatType("Sleeper");
        seatDTO.setStatus("AVAILABLE");
        seatDTO.setBusId(bus.getBusId());

        seat = new Seat();
        seat.setSeatId(1);
        seat.setSeatNumber("A1");
        seat.setSeatType("Sleeper");
        seat.setStatus("AVAILABLE");
        seat.setBus(bus);

        // Route setup
        routeDTO = new RouteDTO();
        routeDTO.setOrigin("City A");
        routeDTO.setDestination("City B");
        routeDTO.setDepartureTime(LocalDateTime.now().plusHours(2));
        routeDTO.setArrivalTime(LocalDateTime.now().plusHours(6));
        routeDTO.setDistanceInKm(300);

        route = new Route();
        route.setRouteId(1);
        route.setOrigin("City A");
        route.setDestination("City B");
        route.setDepartureTime(routeDTO.getDepartureTime());
        route.setArrivalTime(routeDTO.getArrivalTime());
        route.setDistanceInKm(300);

        // Mock ModelMapper mappings
        when(modelMapper.map(any(UserDTO.class), eq(User.class))).thenAnswer(invocation -> {
            UserDTO dto = invocation.getArgument(0);
            User u = new User();
            u.setUserId(user.getUserId());
            u.setName(dto.getName());
            u.setEmail(dto.getEmail());
            u.setPassword(dto.getPassword());
            u.setGender(dto.getGender());
            u.setContactNumber(dto.getContactNumber());
            u.setRole(dto.getRole());
            return u;
        });

        when(modelMapper.map(any(User.class), eq(UserDTO.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            UserDTO dto = new UserDTO();
            dto.setName(u.getName());
            dto.setEmail(u.getEmail());
            dto.setPassword(u.getPassword());
            dto.setGender(u.getGender());
            dto.setContactNumber(u.getContactNumber());
            dto.setRole(u.getRole());
            return dto;
        });

        when(modelMapper.map(any(RouteDTO.class), eq(Route.class))).thenReturn(route);
        when(modelMapper.map(any(Route.class), eq(RouteDTO.class))).thenReturn(routeDTO);

        when(modelMapper.map(any(SeatDTO.class), eq(Seat.class))).thenReturn(seat);
        when(modelMapper.map(any(Seat.class), eq(SeatDTO.class))).thenReturn(seatDTO);

        when(modelMapper.map(any(AmenityDTO.class), eq(Amenity.class))).thenReturn(amenity);
        when(modelMapper.map(any(Amenity.class), eq(AmenityDTO.class))).thenReturn(amenityDTO);

        // Mock repository save/find operations
        when(amenityRepository.save(any(Amenity.class))).thenReturn(amenity);

        when(userRepository.existsByEmail(userDTO.getEmail())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userRepository.findByEmailAndPassword(userDTO.getEmail(), userDTO.getPassword())).thenReturn(user);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        when(seatRepository.save(any(Seat.class))).thenReturn(seat);
        when(seatRepository.findById(1)).thenReturn(Optional.of(seat));

        when(busRepository.findById(bus.getBusId())).thenReturn(Optional.of(bus));

        when(routeRepository.save(any(Route.class))).thenReturn(route);
        when(routeRepository.findById(1)).thenReturn(Optional.of(route));

        // PasswordEncoder mock
        when(passwordEncoder.encode(any(CharSequence.class))).thenReturn("encodedPassword");
    }

    // AmenityService Tests
    @Test
    void testAddAmenity() {
        String result = amenityService.addAmenity(amenityDTO);
        assertEquals("Amenity added successfully.", result);
    }

    // UserService Tests
    @Test
    void testRegisterUser() {
        String result = userService.registerUser(userDTO);
        assertEquals("USER REGISTERED SUCESSFULLY", result);
    }

    @Test
    void testLoginUserSuccess() {
        String result = userService.loginUser(userDTO.getEmail(), userDTO.getPassword());
        assertEquals("Login successful.", result);
    }

    @Test
    void testLoginUserFail() {
        when(userRepository.findByEmailAndPassword(userDTO.getEmail(), "wrongpass")).thenReturn(null);
        Exception exception = assertThrows(Exception.class, () -> {
            userService.loginUser(userDTO.getEmail(), "wrongpass");
        });
        assertTrue(exception.getMessage().contains("Invalid email or password"));
    }

    @Test
    void testGetUserById() {
        UserDTO result = userService.getUserById(1);
        assertEquals("John", result.getName());
    }

    @Test
    void testUpdateUser() {
        userDTO.setName("Updated John");
        UserDTO result = userService.updateUser(1, userDTO);
        assertEquals("Updated John", result.getName());
    }

    @Test
    void testDeleteUser() {
        when(userRepository.existsById(1)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1);
        String result = userService.deleteUser(1);
        assertEquals("User deleted successfully.", result);
    }

    // SeatService Tests
    @Test
    void testAddSeat() {
        SeatDTO result = seatService.addSeat(seatDTO);
        assertEquals("A1", result.getSeatNumber());
    }

    @Test
    void testUpdateSeat() {
        seatDTO.setStatus("BOOKED");
        SeatDTO result = seatService.updateSeat(1, seatDTO);
        assertEquals("BOOKED", result.getStatus());
    }

    // RouteService Tests
    @Test
    void testAddRoute() {
        String result = routeService.addRoute(routeDTO);
        assertEquals("Route added successfully.", result);
    }

    @Test
    void testUpdateRoute() {
        routeDTO.setOrigin("City X");
        RouteDTO result = routeService.updateRoute(1, routeDTO);
        assertEquals("City X", result.getOrigin());
    }
}
