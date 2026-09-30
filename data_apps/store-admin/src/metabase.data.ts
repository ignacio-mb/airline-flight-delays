function pickFields<TFields extends object, TKey extends keyof TFields>(
  fields: TFields,
  keys: readonly TKey[],
  options?: { sourceFieldId?: number },
): Pick<TFields, TKey> {
  return Object.fromEntries(keys.map((key) => {
    const field = fields[key] as { tableId?: number };
    if (options?.sourceFieldId == null) {
      return [key, field];
    }
    const { tableId, ...joinedField } = field;

    return [key, { ...joinedField, sourceFieldId: options.sourceFieldId }];
  })) as Pick<TFields, TKey>;
}

const models = {
  storeCustomers: {
    actions: {
      updateCustomer: {
        description: "Updates one people row. The Store Admin app sends only name, email, address, city, state, zip, birth date and source (D6); password is sensitive and not exposed.",
        key: "updateCustomer",
        name: "Update customer",
        type: "implicit",
        id: 4,
        kind: "action",
        parameters: [
          {
            slug: "id",
            displayName: "ID",
            jsType: "number",
            required: true
          },
          {
            slug: "address",
            displayName: "Address",
            jsType: "string"
          },
          {
            slug: "email",
            displayName: "Email",
            jsType: "string"
          },
          {
            slug: "name",
            displayName: "Name",
            jsType: "string"
          },
          {
            slug: "city",
            displayName: "City",
            jsType: "string"
          },
          {
            slug: "longitude",
            displayName: "Longitude",
            jsType: "number"
          },
          {
            slug: "state",
            displayName: "State",
            jsType: "string"
          },
          {
            slug: "source",
            displayName: "Source",
            jsType: "string"
          },
          {
            slug: "birth_date",
            displayName: "Birth date",
            jsType: "Date"
          },
          {
            slug: "zip",
            displayName: "Zip",
            jsType: "string"
          },
          {
            slug: "latitude",
            displayName: "Latitude",
            jsType: "number"
          },
          {
            slug: "created_at",
            displayName: "Created at",
            jsType: "Date"
          }
        ],
        entityId: "-xH5Ar9z7g88dsj5bkdWt",
        implicitKind: "row/update"
      }
    }
  },
  storeOrders: {
    actions: {
      createOrder: {
        description: "Inserts one order row. The Store Admin app computes subtotal (price x quantity), tax (customer state rate from past orders), total (subtotal + tax - discount), created_at (now) and the next order id (D3).",
        key: "createOrder",
        name: "Create order",
        type: "implicit",
        id: 3,
        kind: "action",
        parameters: [
          {
            slug: "id",
            displayName: "Order ID",
            jsType: "number",
            required: true
          },
          {
            slug: "user_id",
            displayName: "Customer",
            jsType: "number"
          },
          {
            slug: "product_id",
            displayName: "Product",
            jsType: "number"
          },
          {
            slug: "subtotal",
            displayName: "Subtotal",
            jsType: "number"
          },
          {
            slug: "tax",
            displayName: "Tax",
            jsType: "number"
          },
          {
            slug: "total",
            displayName: "Total",
            jsType: "number"
          },
          {
            slug: "discount",
            displayName: "Discount",
            jsType: "number"
          },
          {
            slug: "created_at",
            displayName: "Created at",
            jsType: "Date"
          },
          {
            slug: "quantity",
            displayName: "Quantity",
            jsType: "number"
          }
        ],
        entityId: "Cw5bOC96hMroFTdh9aOWu",
        implicitKind: "row/create"
      }
    }
  }
} as const;

const tables = {
  // Database: Analytics
  // Schema: flight_analytics
  // Table: mart_bts_dim_airline
  martBtsDimAirline: {
    type: "table",
    id: 416,
    name: "Mart Bts Dim Airline",
    fields: {
      // Display name: Airline code
      // Description: Two-character IATA airline code, as on Flights.
      // Semantic type: type/PK
      airlineCode: {
        type: "column",
        name: "airline_code",
        sourceName: "mart_bts_dim_airline",
        jsType: "string",
        fieldId: 4294,
        tableId: 416,
        baseType: "type/Text"
      },
      // Display name: Airline
      // Description: Airline name.
      // Semantic type: type/Name
      airlineName: {
        type: "column",
        name: "airline_name",
        sourceName: "mart_bts_dim_airline",
        jsType: "string",
        fieldId: 4295,
        tableId: 416,
        baseType: "type/Text"
      },
      // Display name: Carrier group
      // Description: Legacy (AA, DL, UA, US, AS, HA), Low-cost (WN, B6, F9, NK, VX), or Regional (EV, MQ, OO). Classification decided for this analysis (D6), not reported by DOT.
      // Semantic type: type/Category
      carrierGroup: {
        type: "column",
        name: "carrier_group",
        sourceName: "mart_bts_dim_airline",
        jsType: "string",
        fieldId: 4296,
        tableId: 416,
        baseType: "type/Text"
      },
      // Display name: First flight month
      // Description: First month of 2015 with flights for this airline.
      firstFlightMonth: {
        type: "column",
        name: "first_flight_month",
        sourceName: "mart_bts_dim_airline",
        jsType: "Date",
        fieldId: 4297,
        tableId: 416,
        baseType: "type/Date"
      },
      // Display name: Last flight month
      // Description: Last month of 2015 with flights for this airline. June for US Airways.
      lastFlightMonth: {
        type: "column",
        name: "last_flight_month",
        sourceName: "mart_bts_dim_airline",
        jsType: "Date",
        fieldId: 4298,
        tableId: 416,
        baseType: "type/Date"
      },
      // Display name: Merged into
      // Description: The airline this one merged into during 2015: US Airways reported jointly with American from July.
      // Semantic type: type/FK
      mergedIntoAirlineCode: {
        type: "column",
        name: "merged_into_airline_code",
        sourceName: "mart_bts_dim_airline",
        jsType: "string",
        fieldId: 4299,
        tableId: 416,
        baseType: "type/Text"
      }
    }
  },
  // Database: Analytics
  // Schema: flight_analytics
  // Table: mart_bts_dim_airport
  martBtsDimAirport: {
    type: "table",
    id: 417,
    name: "Mart Bts Dim Airport",
    fields: {
      // Display name: City
      // Description: City the airport serves.
      // Semantic type: type/City
      airportCity: {
        type: "column",
        name: "airport_city",
        sourceName: "mart_bts_dim_airport",
        jsType: "string",
        fieldId: 4302,
        tableId: 417,
        baseType: "type/Text"
      },
      // Display name: Airport code
      // Description: Three-letter IATA airport code, as on Flights.
      // Semantic type: type/PK
      airportCode: {
        type: "column",
        name: "airport_code",
        sourceName: "mart_bts_dim_airport",
        jsType: "string",
        fieldId: 4300,
        tableId: 417,
        baseType: "type/Text"
      },
      // Display name: Country
      // Description: Always USA.
      // Semantic type: type/Country
      airportCountry: {
        type: "column",
        name: "airport_country",
        sourceName: "mart_bts_dim_airport",
        jsType: "string",
        fieldId: 4304,
        tableId: 417,
        baseType: "type/Text"
      },
      // Display name: Airport
      // Description: Airport name.
      // Semantic type: type/Name
      airportName: {
        type: "column",
        name: "airport_name",
        sourceName: "mart_bts_dim_airport",
        jsType: "string",
        fieldId: 4301,
        tableId: 417,
        baseType: "type/Text"
      },
      // Display name: State
      // Description: Two-letter state or territory code (AS, GU, PR, VI are territories).
      // Semantic type: type/State
      airportState: {
        type: "column",
        name: "airport_state",
        sourceName: "mart_bts_dim_airport",
        jsType: "string",
        fieldId: 4303,
        tableId: 417,
        baseType: "type/Text"
      },
      // Display name: BTS airport id (October)
      // Description: The 5-digit BTS id October 2015 flights use for this airport, inferred from September/November legs (D3).
      btsAirportId: {
        type: "column",
        name: "bts_airport_id",
        sourceName: "mart_bts_dim_airport",
        jsType: "string",
        fieldId: 4307,
        tableId: 417,
        baseType: "type/Text"
      },
      // Display name: Has BTS airport id
      // Description: True when the October crosswalk identified this airport's BTS id (300 of 322).
      isMatchedBtsAirportId: {
        type: "column",
        name: "is_matched_bts_airport_id",
        sourceName: "mart_bts_dim_airport",
        jsType: "boolean",
        fieldId: 4308,
        tableId: 417,
        baseType: "type/Boolean"
      },
      // Display name: Latitude
      // Description: Degrees north. Empty for ECP, PBG, UST.
      // Semantic type: type/Latitude
      latitude: {
        type: "column",
        name: "latitude",
        sourceName: "mart_bts_dim_airport",
        jsType: "number",
        fieldId: 4305,
        tableId: 417,
        baseType: "type/Decimal"
      },
      // Display name: Longitude
      // Description: Degrees east (negative). Empty for ECP, PBG, UST.
      // Semantic type: type/Longitude
      longitude: {
        type: "column",
        name: "longitude",
        sourceName: "mart_bts_dim_airport",
        jsType: "number",
        fieldId: 4306,
        tableId: 417,
        baseType: "type/Decimal"
      }
    }
  },
  // Database: Analytics
  // Schema: flight_analytics
  // Table: mart_bts_fct_flight
  martBtsFctFlight: {
    type: "table",
    id: 415,
    name: "Mart Bts Fct Flight",
    fields: {
      // Display name: Air-system delay (min)
      // Description: Minutes of the arrival delay caused by the National Aviation System: non-extreme weather, airport operations, traffic, air traffic control. Only on flights 15+ min late.
      airSystemDelayMin: {
        type: "column",
        name: "air_system_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4278,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Air time (min)
      // Description: Minutes from wheels off to wheels on. Empty for cancelled and diverted flights.
      airTimeMin: {
        type: "column",
        name: "air_time_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4283,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Airline
      // Description: Operating airline's IATA code; links to Airlines for name and carrier group.
      // Semantic type: type/FK
      airlineCode: {
        type: "column",
        name: "airline_code",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4260,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Airline-caused delay (min)
      // Description: Minutes of the arrival delay caused by the airline: maintenance, crew, cleaning, baggage, fueling. Only on flights 15+ min late; the five causes sum to the arrival delay.
      airlineDelayMin: {
        type: "column",
        name: "airline_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4276,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Airport code source
      // Description: iata (as reported), inferred_oct (October flight, codes inferred from the crosswalk), or unmapped (an October airport the crosswalk could not identify).
      // Semantic type: type/Source
      airportCodeSource: {
        type: "column",
        name: "airport_code_source",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4266,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Arrival delay (min)
      // Description: Minutes from scheduled to actual gate arrival; negative when early. Empty for cancelled and diverted flights.
      arrivalDelayMin: {
        type: "column",
        name: "arrival_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4275,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Actual arrival (hhmm)
      // Description: Actual gate arrival as reported, local hhmm at the arrival airport; 2400 is midnight.
      arrivalTimeHhmm: {
        type: "column",
        name: "arrival_time_hhmm",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4292,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Cancellation cause
      // Description: Why a cancelled flight was cancelled: Weather, Airline/Carrier, National Air System, or Security. Empty for flights that were not cancelled.
      // Semantic type: type/Category
      cancellationCause: {
        type: "column",
        name: "cancellation_cause",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4273,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Departure delay (min)
      // Description: Minutes from scheduled to actual gate departure; negative when early. Empty when the flight never left the gate.
      departureDelayMin: {
        type: "column",
        name: "departure_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4274,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Actual departure (hhmm)
      // Description: Actual gate departure as reported, local hhmm; 2400 is midnight at the end of the day.
      departureTimeHhmm: {
        type: "column",
        name: "departure_time_hhmm",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4290,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Destination airport
      // Description: Scheduled arrival airport's IATA code; links to Airports. October codes are inferred; empty for 548 October flights the crosswalk could not identify.
      // Semantic type: type/FK
      destinationAirportCode: {
        type: "column",
        name: "destination_airport_code",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4264,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Destination airport (as reported)
      // Description: Destination as the BTS file reported it: IATA code, or a 5-digit BTS id in October.
      destinationAirportRaw: {
        type: "column",
        name: "destination_airport_raw",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4288,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Distance (miles)
      // Description: Miles between the two airports.
      distanceMiles: {
        type: "column",
        name: "distance_miles",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4286,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Actual gate-to-gate (min)
      // Description: Actual minutes from gate to gate. Empty for cancelled and diverted flights.
      elapsedTimeMin: {
        type: "column",
        name: "elapsed_time_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4285,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Flight date
      // Description: Local date of the scheduled departure (the date basis for every flight metric).
      flightDate: {
        type: "column",
        name: "flight_date",
        sourceName: "mart_bts_fct_flight",
        jsType: "Date",
        fieldId: 4257,
        tableId: 415,
        baseType: "type/Date"
      },
      // Display name: Flight ID
      // Description: Position of the flight in the BTS source file; the data has no id of its own.
      // Semantic type: type/PK
      flightId: {
        type: "column",
        name: "flight_id",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4256,
        tableId: 415,
        baseType: "type/BigInteger"
      },
      // Display name: Flight number
      // Description: The airline's flight number. Not unique: one number often flies several legs a day.
      flightNumber: {
        type: "column",
        name: "flight_number",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4261,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Flight status
      // Description: on_time (arrived < 15 min late), late (15+ min late), cancelled, or diverted.
      // Semantic type: type/Category
      flightStatus: {
        type: "column",
        name: "flight_status",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4267,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Is cancelled
      // Description: True when the flight was cancelled.
      isCancelled: {
        type: "column",
        name: "is_cancelled",
        sourceName: "mart_bts_fct_flight",
        jsType: "boolean",
        fieldId: 4270,
        tableId: 415,
        baseType: "type/Boolean"
      },
      // Display name: Is complete period
      // Description: True when the flight's month is fully loaded. Every 2015 month is complete (closed extract).
      isCompletePeriod: {
        type: "column",
        name: "is_complete_period",
        sourceName: "mart_bts_fct_flight",
        jsType: "boolean",
        fieldId: 4293,
        tableId: 415,
        baseType: "type/Boolean"
      },
      // Display name: Is completed
      // Description: True when the flight was neither cancelled nor diverted. Only completed flights have an arrival delay.
      isCompleted: {
        type: "column",
        name: "is_completed",
        sourceName: "mart_bts_fct_flight",
        jsType: "boolean",
        fieldId: 4272,
        tableId: 415,
        baseType: "type/Boolean"
      },
      // Display name: Is diverted
      // Description: True when the flight landed somewhere other than its destination.
      isDiverted: {
        type: "column",
        name: "is_diverted",
        sourceName: "mart_bts_fct_flight",
        jsType: "boolean",
        fieldId: 4271,
        tableId: 415,
        baseType: "type/Boolean"
      },
      // Display name: Is late (15+ min)
      // Description: True when the flight completed and arrived 15 or more minutes after schedule. These are the flights with delay causes.
      isLate15: {
        type: "column",
        name: "is_late_15",
        sourceName: "mart_bts_fct_flight",
        jsType: "boolean",
        fieldId: 4269,
        tableId: 415,
        baseType: "type/Boolean"
      },
      // Display name: Is on time
      // Description: True when the flight completed and arrived less than 15 minutes after its scheduled arrival (DOT standard). False for late, cancelled, and diverted flights.
      isOnTime: {
        type: "column",
        name: "is_on_time",
        sourceName: "mart_bts_fct_flight",
        jsType: "boolean",
        fieldId: 4268,
        tableId: 415,
        baseType: "type/Boolean"
      },
      // Display name: Late-aircraft delay (min)
      // Description: Minutes of the arrival delay caused by the aircraft arriving late from its previous flight. Only on flights 15+ min late.
      lateAircraftDelayMin: {
        type: "column",
        name: "late_aircraft_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4277,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Origin airport
      // Description: Departure airport's IATA code; links to Airports. October codes are inferred from September/November legs; empty for 549 October flights the crosswalk could not identify.
      // Semantic type: type/FK
      originAirportCode: {
        type: "column",
        name: "origin_airport_code",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4263,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Origin airport (as reported)
      // Description: Origin as the BTS file reported it: IATA code, or a 5-digit BTS id in October.
      originAirportRaw: {
        type: "column",
        name: "origin_airport_raw",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4287,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Route
      // Description: Origin-destination pair, e.g. ORD-LGA. Directional. Empty when either airport is unknown.
      // Semantic type: type/Category
      route: {
        type: "column",
        name: "route",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4265,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Scheduled arrival (hhmm)
      // Description: Scheduled arrival as reported, local hhmm at the arrival airport.
      scheduledArrivalHhmm: {
        type: "column",
        name: "scheduled_arrival_hhmm",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4291,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Scheduled departure (hhmm)
      // Description: Scheduled departure as reported, local hhmm.
      scheduledDepartureHhmm: {
        type: "column",
        name: "scheduled_departure_hhmm",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4289,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Scheduled departure hour
      // Description: Hour of the scheduled departure, 0-23, local time at the departure airport.
      // Semantic type: type/Category
      scheduledDepartureHour: {
        type: "column",
        name: "scheduled_departure_hour",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4259,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Scheduled departure (local)
      // Description: Scheduled gate departure, local time at the departure airport.
      scheduledDepartureLocal: {
        type: "column",
        name: "scheduled_departure_local",
        sourceName: "mart_bts_fct_flight",
        jsType: "Date",
        fieldId: 4258,
        tableId: 415,
        baseType: "type/DateTime"
      },
      // Display name: Scheduled gate-to-gate (min)
      // Description: Scheduled minutes from gate to gate.
      scheduledTimeMin: {
        type: "column",
        name: "scheduled_time_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4284,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Security delay (min)
      // Description: Minutes of the arrival delay caused by security: evacuations, re-boarding, screening lines. Only on flights 15+ min late.
      securityDelayMin: {
        type: "column",
        name: "security_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4280,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Tail number
      // Description: Aircraft registration. Empty for 14,721 cancelled flights.
      tailNumber: {
        type: "column",
        name: "tail_number",
        sourceName: "mart_bts_fct_flight",
        jsType: "string",
        fieldId: 4262,
        tableId: 415,
        baseType: "type/Text"
      },
      // Display name: Taxi in (min)
      // Description: Minutes from wheels on to arriving at the gate.
      taxiInMin: {
        type: "column",
        name: "taxi_in_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4282,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Taxi out (min)
      // Description: Minutes from leaving the gate to wheels off.
      taxiOutMin: {
        type: "column",
        name: "taxi_out_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4281,
        tableId: 415,
        baseType: "type/Integer"
      },
      // Display name: Weather delay (min)
      // Description: Minutes of the arrival delay caused by extreme weather. Only on flights 15+ min late.
      weatherDelayMin: {
        type: "column",
        name: "weather_delay_min",
        sourceName: "mart_bts_fct_flight",
        jsType: "number",
        fieldId: 4279,
        tableId: 415,
        baseType: "type/Integer"
      }
    },
    segments: {
      // Entity ID: A_I5W1-eYiS00Bv0m3IjA
      // Description: Cancelled flights (89,884; 1.5% of scheduled), with a cancellation cause. Weather is the largest cause (54%). Owner: ignacio@metabase.com.
      cancelledFlights: {
        type: "segment",
        id: 3,
        tableId: 415,
        name: "Cancelled flights"
      },
      // Entity ID: rnLXDkkvSvM1e6ieusPPt
      // Description: Flights that were neither cancelled nor diverted (5,714,008; 98.2% of scheduled). Excludes 89,884 cancelled and 15,187 diverted flights. Use for delay distributions; never as the denominator of the on-time rate, which counts every scheduled flight. Owner: ignacio@metabase.com.
      completedFlights: {
        type: "segment",
        id: 1,
        tableId: 415,
        name: "Completed flights"
      },
      // Entity ID: e4t0GeV-myQRH3exYpbdz
      // Description: Completed flights that arrived 15 or more minutes late (1,063,439; 18.3% of scheduled). The only flights with delay-cause minutes. Excludes cancelled and diverted flights. Owner: ignacio@metabase.com.
      "lateArrivals(15+Min)": {
        type: "segment",
        id: 2,
        tableId: 415,
        name: "Late arrivals (15+ min)"
      },
      // Entity ID: KxQC_jgEDHnsanACSY0Ci
      // Description: October 2015 flights whose airports were inferred from September/November legs because the source used 5-digit BTS ids (485,068 flights). For auditing D3; 1,097 more October flights keep an unknown airport and are not in this segment. Owner: ignacio@metabase.com.
      octoberFlightsWithInferredAirports: {
        type: "segment",
        id: 4,
        tableId: 415,
        name: "October flights with inferred airports"
      }
    },
    measures: {
      // Entity ID: VKDhMaoJnrsFv4wY7m6Nz
      // Description: Minutes of arrival delay caused by the National Aviation System (non-extreme weather, airport operations, traffic, ATC), on flights 15+ min late. Owner: ignacio@metabase.com.
      airSystemDelayMinutes: {
        type: "measure",
        id: 14,
        tableId: 415,
        name: "Air-system delay minutes",
        columns: [
          // Display name: Sum of Air-system delay (min)
          // Base type: type/Integer
          {
            type: "column",
            name: "air_system_delay_minutes",
            jsType: "number"
          }
        ]
      },
      // Entity ID: 0ONBkRcCiS2ZcXyj-pYHO
      // Description: Minutes of arrival delay caused by the airline (maintenance, crew, cleaning, baggage, fueling), on flights 15+ min late. Owner: ignacio@metabase.com.
      airlineCausedDelayMinutes: {
        type: "measure",
        id: 12,
        tableId: 415,
        name: "Airline-caused delay minutes",
        columns: [
          // Display name: Sum of Airline-caused delay (min)
          // Base type: type/Integer
          {
            type: "column",
            name: "airline_delay_minutes",
            jsType: "number"
          }
        ]
      },
      // Entity ID: 3bOz4QQXqRZn9-h0yyB0e
      // Description: Average minutes from scheduled to actual arrival over completed flights; early arrivals count as negative minutes. Cancelled and diverted flights have no arrival delay and are excluded. Owner: ignacio@metabase.com.
      averageArrivalDelay: {
        type: "measure",
        id: 8,
        tableId: 415,
        name: "Average arrival delay",
        columns: [
          // Display name: Average of Arrival delay (min)
          // Base type: type/Float
          {
            type: "column",
            name: "avg_arrival_delay_min",
            jsType: "number"
          }
        ]
      },
      // Entity ID: UPCldOeyuDiWEkG-3aAJ7
      // Description: Count of cancelled flights. Owner: ignacio@metabase.com.
      cancelledFlights: {
        type: "measure",
        id: 4,
        tableId: 415,
        name: "Cancelled flights",
        columns: [
          // Display name: Count of rows matching condition
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "cancelled_flights",
            jsType: "number"
          }
        ]
      },
      // Entity ID: UCJPp8dn3gTgsQostc_1o
      // Description: Count of flights neither cancelled nor diverted: the flights with an arrival delay. Owner: ignacio@metabase.com.
      completedFlights: {
        type: "measure",
        id: 6,
        tableId: 415,
        name: "Completed flights",
        columns: [
          // Display name: Count of rows matching condition
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "completed_flights",
            jsType: "number"
          }
        ]
      },
      // Entity ID: ClWRgxAxJgP55gDWAXDo6
      // Description: Sum of arrival delay minutes over flights 15+ minutes late; equals the sum of the five delay-cause minutes. Owner: ignacio@metabase.com.
      delayMinutesOnLateArrivals: {
        type: "measure",
        id: 11,
        tableId: 415,
        name: "Delay minutes on late arrivals",
        columns: [
          // Display name: Sum of Arrival delay (min) matching condition
          // Base type: type/Integer
          {
            type: "column",
            name: "late_arrival_delay_minutes",
            jsType: "number"
          }
        ]
      },
      // Entity ID: GlmRHyjwxNJBFdupTJ77w
      // Description: Count of flights that were not cancelled and have a departure delay: the denominator of Average departure delay. Owner: ignacio@metabase.com.
      departedFlights: {
        type: "measure",
        id: 10,
        tableId: 415,
        name: "Departed flights",
        columns: [
          // Display name: Count of rows matching condition
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "departed_flights",
            jsType: "number"
          }
        ]
      },
      // Entity ID: _51K12-YqYFmC6FZqNn4B
      // Description: Sum of departure delay minutes over flights that were not cancelled; early departures count as negative. Numerator of Average departure delay. Owner: ignacio@metabase.com.
      "departureDelayMinutes(departedFlights)": {
        type: "measure",
        id: 9,
        tableId: 415,
        name: "Departure delay minutes (departed flights)",
        columns: [
          // Display name: Sum of Departure delay (min) matching condition
          // Base type: type/Integer
          {
            type: "column",
            name: "departure_delay_minutes",
            jsType: "number"
          }
        ]
      },
      // Entity ID: m_6Mybw7dDEPotrGB-keG
      // Description: Count of flights that landed somewhere other than their destination. Owner: ignacio@metabase.com.
      divertedFlights: {
        type: "measure",
        id: 5,
        tableId: 415,
        name: "Diverted flights",
        columns: [
          // Display name: Count of rows matching condition
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "diverted_flights",
            jsType: "number"
          }
        ]
      },
      // Entity ID: D82r4WTcVV3Z21N4C_SdG
      // Description: Count of scheduled flights, including cancelled and diverted. The denominator of every flight rate. Owner: ignacio@metabase.com.
      flightsScheduled: {
        type: "measure",
        id: 1,
        tableId: 415,
        name: "Flights scheduled",
        columns: [
          // Display name: Flights scheduled
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "flights_scheduled",
            jsType: "number"
          }
        ]
      },
      // Entity ID: WZCnE2L9plXud8imKvX_m
      // Description: Minutes of arrival delay caused by the aircraft arriving late from its previous flight, on flights 15+ min late. Owner: ignacio@metabase.com.
      lateAircraftDelayMinutes: {
        type: "measure",
        id: 13,
        tableId: 415,
        name: "Late-aircraft delay minutes",
        columns: [
          // Display name: Sum of Late-aircraft delay (min)
          // Base type: type/Integer
          {
            type: "column",
            name: "late_aircraft_delay_minutes",
            jsType: "number"
          }
        ]
      },
      // Entity ID: KgMy-7AV_TyDnffgLhgY-
      // Description: Count of completed flights that arrived 15 or more minutes after schedule (BTS late arrival). These are the flights that carry delay causes. Owner: ignacio@metabase.com.
      "lateArrivals(15+Min)": {
        type: "measure",
        id: 3,
        tableId: 415,
        name: "Late arrivals (15+ min)",
        columns: [
          // Display name: Count of rows matching condition
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "late_arrivals",
            jsType: "number"
          }
        ]
      },
      // Entity ID: zSv3qjBdJ7Aql7TxbejJs
      // Description: Count of flights that left the gate 15 or more minutes late and were not cancelled (BTS late departure; 2,054 cancelled flights that left late are excluded). Owner: ignacio@metabase.com.
      "lateDepartures(15+Min)": {
        type: "measure",
        id: 7,
        tableId: 415,
        name: "Late departures (15+ min)",
        columns: [
          // Display name: Count of rows matching condition
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "late_departures",
            jsType: "number"
          }
        ]
      },
      // Entity ID: 2ahSRbhvNH0BkgaEZR0PF
      // Description: Count of flights that completed and arrived less than 15 minutes after schedule (DOT standard, D1). Cancelled and diverted flights are not on time. Owner: ignacio@metabase.com.
      onTimeFlights: {
        type: "measure",
        id: 2,
        tableId: 415,
        name: "On-time flights",
        columns: [
          // Display name: On-time flights
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "on_time_flights",
            jsType: "number"
          }
        ]
      },
      // Entity ID: TThWZChIsXNUHGoK2TS38
      // Description: Minutes of arrival delay caused by security, on flights 15+ min late. Owner: ignacio@metabase.com.
      securityDelayMinutes: {
        type: "measure",
        id: 16,
        tableId: 415,
        name: "Security delay minutes",
        columns: [
          // Display name: Sum of Security delay (min)
          // Base type: type/Integer
          {
            type: "column",
            name: "security_delay_minutes",
            jsType: "number"
          }
        ]
      },
      // Entity ID: ZtZZAXx2gX0ov1WxlqvDr
      // Description: Minutes of arrival delay caused by extreme weather, on flights 15+ min late. Owner: ignacio@metabase.com.
      weatherDelayMinutes: {
        type: "measure",
        id: 15,
        tableId: 415,
        name: "Weather delay minutes",
        columns: [
          // Display name: Sum of Weather delay (min)
          // Base type: type/Integer
          {
            type: "column",
            name: "weather_delay_minutes",
            jsType: "number"
          }
        ]
      }
    }
  },
  // Description: This is a confirmed order for a product from a user.
  // Database: Sample Database
  // Schema: public
  orders: {
    type: "table",
    id: 199,
    name: "Orders",
    fields: {
      // Display name: Created at
      // Description: When the order was placed. The date basis for every order metric.
      // Semantic type: type/CreationTimestamp
      createdAt: {
        type: "column",
        name: "created_at",
        sourceName: "orders",
        jsType: "Date",
        fieldId: 2073,
        tableId: 199,
        baseType: "type/DateTime"
      },
      // Display name: Discount
      // Description: Discount applied, USD. Empty when no discount (1,915 of 18,760 historical orders have one).
      // Semantic type: type/Currency
      discount: {
        type: "column",
        name: "discount",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2072,
        tableId: 199,
        baseType: "type/Float"
      },
      // Display name: Order ID
      // Description: Order identifier. New orders from the app take the next number (the table has no id generator).
      // Semantic type: type/PK
      id: {
        type: "column",
        name: "id",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2066,
        tableId: 199,
        baseType: "type/BigInteger"
      },
      // Display name: Product
      // Description: The product ordered; links to Products.
      // Semantic type: type/FK
      productId: {
        type: "column",
        name: "product_id",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2068,
        tableId: 199,
        baseType: "type/Integer"
      },
      // Display name: Quantity
      // Description: Units of the product in the order.
      // Semantic type: type/Quantity
      quantity: {
        type: "column",
        name: "quantity",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2074,
        tableId: 199,
        baseType: "type/Integer"
      },
      // Display name: Subtotal
      // Description: Order value before tax and discount, USD.
      // Semantic type: type/Currency
      subtotal: {
        type: "column",
        name: "subtotal",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2069,
        tableId: 199,
        baseType: "type/Float"
      },
      // Display name: Tax
      // Description: Sales tax, USD, at the customer's state rate.
      // Semantic type: type/Currency
      tax: {
        type: "column",
        name: "tax",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2070,
        tableId: 199,
        baseType: "type/Float"
      },
      // Display name: Total
      // Description: Amount recorded for the order, USD. Revenue is the sum of this column (D2).
      // Semantic type: type/Currency
      total: {
        type: "column",
        name: "total",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2071,
        tableId: 199,
        baseType: "type/Float"
      },
      // Display name: Customer
      // Description: The customer who placed the order; links to People.
      // Semantic type: type/FK
      userId: {
        type: "column",
        name: "user_id",
        sourceName: "orders",
        jsType: "number",
        fieldId: 2067,
        tableId: 199,
        baseType: "type/Integer"
      }
    },
    segments: {
      // Entity ID: MAmM6sKUy3R1cqRrfUMzL
      // Description: Orders outside April 2020, the partial month where the historical data ends (2020-04-19; 344 orders vs ~540 a month). Use for monthly trends; app orders are kept. Owner: ignacio@metabase.com.
      completeMonths: {
        type: "segment",
        id: 5,
        tableId: 199,
        name: "Complete months"
      },
      // Entity ID: UnoY0HsiDlf5a9Suv0fQd
      // Description: Orders with a discount above zero (1,915 of 18,760 historical). Owner: ignacio@metabase.com.
      discountedOrders: {
        type: "segment",
        id: 6,
        tableId: 199,
        name: "Discounted orders"
      }
    },
    measures: {
      // Entity ID: ynGnkWbOr36_aj27bfyy9
      // Description: Distinct customers with at least one order in the period. Owner: ignacio@metabase.com.
      customersOrdering: {
        type: "measure",
        id: 23,
        tableId: 199,
        name: "Customers ordering",
        columns: [
          // Display name: Distinct values of Customer
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "customers_ordering",
            jsType: "number"
          }
        ]
      },
      // Entity ID: ON8cwOLWH6ZBkVK1O3gR2
      // Description: Sum of discounts, USD. Owner: ignacio@metabase.com.
      discountsGiven: {
        type: "measure",
        id: 21,
        tableId: 199,
        name: "Discounts given",
        columns: [
          // Display name: Sum of Discount
          // Base type: type/Float
          // Semantic type: type/Currency
          {
            type: "column",
            name: "discounts",
            jsType: "number"
          }
        ]
      },
      // Entity ID: JSLqANxCPCIC9tqFPZjEa
      // Description: Sum of quantity across orders. Owner: ignacio@metabase.com.
      itemsSold: {
        type: "measure",
        id: 22,
        tableId: 199,
        name: "Items sold",
        columns: [
          // Display name: Sum of Quantity
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "items_sold",
            jsType: "number"
          }
        ]
      },
      // Entity ID: ve74IGZ7Vdj5Or53s90BK
      // Description: Count of orders. Owner: ignacio@metabase.com.
      orders: {
        type: "measure",
        id: 17,
        tableId: 199,
        name: "Orders",
        columns: [
          // Display name: Count
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "orders",
            jsType: "number"
          }
        ]
      },
      // Entity ID: qesRIBCthjLDSHsqVZwA5
      // Description: Sum of the recorded order total, USD (D2). Recomputing subtotal + tax - discount would read 5.3% lower on the historical data. Owner: ignacio@metabase.com.
      revenue: {
        type: "measure",
        id: 18,
        tableId: 199,
        name: "Revenue",
        columns: [
          // Display name: Sum of Total
          // Base type: type/Float
          // Semantic type: type/Currency
          {
            type: "column",
            name: "revenue",
            jsType: "number"
          }
        ]
      },
      // Entity ID: 604I_zlR26593m9U0mvxW
      // Description: Sum of order subtotals before tax and discount, USD. Owner: ignacio@metabase.com.
      subtotal: {
        type: "measure",
        id: 19,
        tableId: 199,
        name: "Subtotal",
        columns: [
          // Display name: Sum of Subtotal
          // Base type: type/Float
          // Semantic type: type/Currency
          {
            type: "column",
            name: "subtotal",
            jsType: "number"
          }
        ]
      },
      // Entity ID: 8hjjOEnPpnDN4qKyNTR6b
      // Description: Sum of sales tax, USD. Owner: ignacio@metabase.com.
      taxCollected: {
        type: "measure",
        id: 20,
        tableId: 199,
        name: "Tax collected",
        columns: [
          // Display name: Sum of Tax
          // Base type: type/Float
          // Semantic type: type/Currency
          {
            type: "column",
            name: "tax",
            jsType: "number"
          }
        ]
      }
    }
  },
  // Description: This is a user account. Note that employees and customer support staff will have accounts.
  // Database: Sample Database
  // Schema: public
  people: {
    type: "table",
    id: 200,
    name: "People",
    fields: {
      // Display name: Address
      // Description: Street address.
      address: {
        type: "column",
        name: "address",
        sourceName: "people",
        jsType: "string",
        fieldId: 2076,
        tableId: 200,
        baseType: "type/Text"
      },
      // Display name: Birth date
      // Description: The date of birth of the user
      birthDate: {
        type: "column",
        name: "birth_date",
        sourceName: "people",
        jsType: "Date",
        fieldId: 2084,
        tableId: 200,
        baseType: "type/Date"
      },
      // Display name: City
      // Description: The city of the account’s billing address
      // Semantic type: type/City
      city: {
        type: "column",
        name: "city",
        sourceName: "people",
        jsType: "string",
        fieldId: 2080,
        tableId: 200,
        baseType: "type/Text"
      },
      // Display name: Created at
      // Description: When the customer signed up; the date basis for New customers.
      // Semantic type: type/CreationTimestamp
      createdAt: {
        type: "column",
        name: "created_at",
        sourceName: "people",
        jsType: "Date",
        fieldId: 2087,
        tableId: 200,
        baseType: "type/DateTime"
      },
      // Display name: Email
      // Description: Customer email; unique across people.
      // Semantic type: type/Email
      email: {
        type: "column",
        name: "email",
        sourceName: "people",
        jsType: "string",
        fieldId: 2077,
        tableId: 200,
        baseType: "type/Text"
      },
      // Display name: ID
      // Description: A unique identifier given to each user.
      // Semantic type: type/PK
      id: {
        type: "column",
        name: "id",
        sourceName: "people",
        jsType: "number",
        fieldId: 2075,
        tableId: 200,
        baseType: "type/BigInteger"
      },
      // Display name: Latitude
      // Description: This is the latitude of the user on sign-up. It might be updated in the future to the last seen location.
      // Semantic type: type/Latitude
      latitude: {
        type: "column",
        name: "latitude",
        sourceName: "people",
        jsType: "number",
        fieldId: 2086,
        tableId: 200,
        baseType: "type/Float"
      },
      // Display name: Longitude
      // Description: This is the longitude of the user on sign-up. It might be updated in the future to the last seen location.
      // Semantic type: type/Longitude
      longitude: {
        type: "column",
        name: "longitude",
        sourceName: "people",
        jsType: "number",
        fieldId: 2081,
        tableId: 200,
        baseType: "type/Float"
      },
      // Display name: Name
      // Description: Customer full name.
      // Semantic type: type/Name
      name: {
        type: "column",
        name: "name",
        sourceName: "people",
        jsType: "string",
        fieldId: 2079,
        tableId: 200,
        baseType: "type/Text"
      },
      // Display name: Source
      // Description: How the customer found the store: Affiliate, Facebook, Google, Organic, Twitter.
      // Semantic type: type/Category
      source: {
        type: "column",
        name: "source",
        sourceName: "people",
        jsType: "string",
        fieldId: 2083,
        tableId: 200,
        baseType: "type/Text"
      },
      // Display name: State
      // Description: Two-letter US state; sets the tax rate on new orders.
      // Semantic type: type/State
      state: {
        type: "column",
        name: "state",
        sourceName: "people",
        jsType: "string",
        fieldId: 2082,
        tableId: 200,
        baseType: "type/Text"
      },
      // Display name: Zip
      // Description: The postal code of the account’s billing address
      // Semantic type: type/ZipCode
      zip: {
        type: "column",
        name: "zip",
        sourceName: "people",
        jsType: "string",
        fieldId: 2085,
        tableId: 200,
        baseType: "type/Text"
      }
    },
    measures: {
      // Entity ID: 5H-7znzQ_KHfCMo0Y6CIb
      // Description: Count of people (customers) by signup date. Owner: ignacio@metabase.com.
      customers: {
        type: "measure",
        id: 24,
        tableId: 200,
        name: "Customers",
        columns: [
          // Display name: Count
          // Base type: type/Integer
          // Semantic type: type/Quantity
          {
            type: "column",
            name: "customers",
            jsType: "number"
          }
        ]
      }
    }
  },
  // Description: This is our product catalog. It includes all products ever sold by the Sample Company.
  // Database: Sample Database
  // Schema: public
  products: {
    type: "table",
    id: 201,
    name: "Products",
    fields: {
      // Display name: Category
      // Description: Product category: Doohickey, Gadget, Gizmo, Widget.
      // Semantic type: type/Category
      category: {
        type: "column",
        name: "category",
        sourceName: "products",
        jsType: "string",
        fieldId: 2091,
        tableId: 201,
        baseType: "type/Text"
      },
      // Display name: Created At
      // Description: The date the product was added to our catalog.
      // Semantic type: type/CreationTimestamp
      createdAt: {
        type: "column",
        name: "created_at",
        sourceName: "products",
        jsType: "Date",
        fieldId: 2095,
        tableId: 201,
        baseType: "type/DateTime"
      },
      // Display name: Ean
      // Description: The international article number. A 13 digit number uniquely identifying the product.
      ean: {
        type: "column",
        name: "ean",
        sourceName: "products",
        jsType: "string",
        fieldId: 2089,
        tableId: 201,
        baseType: "type/Text"
      },
      // Display name: ID
      // Description: The numerical product number. Only used internally. All external communication should use the title or EAN.
      // Semantic type: type/PK
      id: {
        type: "column",
        name: "id",
        sourceName: "products",
        jsType: "number",
        fieldId: 2088,
        tableId: 201,
        baseType: "type/BigInteger"
      },
      // Display name: Price
      // Description: List price, USD; new orders use price x quantity as subtotal.
      // Semantic type: type/Currency
      price: {
        type: "column",
        name: "price",
        sourceName: "products",
        jsType: "number",
        fieldId: 2093,
        tableId: 201,
        baseType: "type/Float"
      },
      // Display name: Rating
      // Description: The average rating users have given the product. This ranges from 1 - 5
      // Semantic type: type/Score
      rating: {
        type: "column",
        name: "rating",
        sourceName: "products",
        jsType: "number",
        fieldId: 2094,
        tableId: 201,
        baseType: "type/Float"
      },
      // Display name: Title
      // Description: The name of the product as it should be displayed to customers.
      // Semantic type: type/Title
      title: {
        type: "column",
        name: "title",
        sourceName: "products",
        jsType: "string",
        fieldId: 2090,
        tableId: 201,
        baseType: "type/Text"
      },
      // Display name: Vendor
      // Description: The source of the product.
      // Semantic type: type/Company
      vendor: {
        type: "column",
        name: "vendor",
        sourceName: "products",
        jsType: "string",
        fieldId: 2092,
        tableId: 201,
        baseType: "type/Text"
      }
    }
  },
  // Description: These are reviews our customers have left on products. Note that these are not tied to orders so it is possible people have reviewed products they did not purchase from us.
  // Database: Sample Database
  // Schema: public
  reviews: {
    type: "table",
    id: 202,
    name: "Reviews",
    fields: {
      // Display name: Body
      // Description: The review the user left. Limited to 2000 characters.
      body: {
        type: "column",
        name: "body",
        sourceName: "reviews",
        jsType: "string",
        fieldId: 2100,
        tableId: 202,
        baseType: "type/Text"
      },
      // Display name: Created At
      // Description: The day and time a review was written by a user.
      // Semantic type: type/CreationTimestamp
      createdAt: {
        type: "column",
        name: "created_at",
        sourceName: "reviews",
        jsType: "Date",
        fieldId: 2101,
        tableId: 202,
        baseType: "type/DateTime"
      },
      // Display name: ID
      // Description: A unique internal identifier for the review. Should not be used externally.
      // Semantic type: type/PK
      id: {
        type: "column",
        name: "id",
        sourceName: "reviews",
        jsType: "number",
        fieldId: 2096,
        tableId: 202,
        baseType: "type/BigInteger"
      },
      // Display name: Product ID
      // Description: The product the review was for
      // Semantic type: type/FK
      productId: {
        type: "column",
        name: "product_id",
        sourceName: "reviews",
        jsType: "number",
        fieldId: 2097,
        tableId: 202,
        baseType: "type/Integer"
      },
      // Display name: Rating
      // Description: The rating (on a scale of 1-5) the user left.
      // Semantic type: type/Score
      rating: {
        type: "column",
        name: "rating",
        sourceName: "reviews",
        jsType: "number",
        fieldId: 2099,
        tableId: 202,
        baseType: "type/Integer"
      },
      // Display name: Reviewer
      // Description: The user who left the review
      reviewer: {
        type: "column",
        name: "reviewer",
        sourceName: "reviews",
        jsType: "string",
        fieldId: 2098,
        tableId: 202,
        baseType: "type/Text"
      }
    }
  }
} as const;

const metrics = {
  // Entity ID: 95ZVRqVyanCYZGhbGQpF8
  // Description: Self-consistent only, no external reference. Sum of the recorded order total in USD ($1,595,328 all time). Uses the total as recorded; recomputing subtotal + tax - discount reads 5.3% lower (D2). Includes tax, net of discounts. Monthly by created_at; April 2020 is partial (data ends 2020-04-19); orders added through the app are dated when entered. Owner: ignacio@metabase.com.
  // Source table: Sample Database.public.orders
  revenue: {
    type: "metric",
    id: 125,
    name: "Revenue",
    databaseId: 1,
    sourceTableId: 199,
    mappedTableIds: [ 199 ],
    columns: [
      // Display name: Revenue
      // Base type: type/Number
      {
        type: "column",
        name: "revenue",
        jsType: "number"
      }
    ],
    dimensions: {
      orders: pickFields(tables.orders.fields, [ "createdAt", "discount", "id", "productId", "quantity", "subtotal", "tax", "total", "userId" ])
    }
  },
  // Entity ID: NpcZ0TBBLtmBTzzWN0mxA
  // Description: Reconciled to BTS Table 1 "Summary of Airline On-Time Performance, Year-to-date through December 2015" on 2026-09-30: exact match, 0.26% (15,187 of 5,819,079). Share of scheduled flights that landed somewhere other than their destination. Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  diversionRate: {
    type: "metric",
    id: 98,
    name: "Diversion rate",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Diversion rate
      // Base type: type/Float
      {
        type: "column",
        name: "diversion_rate",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: gpPA2jdDbGNfBRARR58DS
  // Description: Self-consistent only, no external reference. Average minutes late at arrival over completed flights (4.41 min in 2015); early arrivals count as negative, so the average understates how late late flights are (see Average delay when late). Cancelled and diverted flights (1.8%) have no arrival delay and are excluded. Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Answers: average delay per flight, mean minutes late on arrival. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  averageArrivalDelay: {
    type: "metric",
    id: 102,
    name: "Average arrival delay",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Average arrival delay (min)
      // Base type: type/Number
      {
        type: "column",
        name: "avg_arrival_delay_min",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: Rnyi-DiSk6jvgu6aUYvYW
  // Description: Reconciled to BTS Table 1 "Summary of Airline On-Time Performance, Year-to-date through December 2015" on 2026-09-30: exact match, 18.28% (1,063,439 of 5,819,079). Share of scheduled flights that completed and arrived 15+ minutes late. On-time + late + cancelled + diverted rates sum to 100%. Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  lateArrivalRate: {
    type: "metric",
    id: 99,
    name: "Late arrival rate",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Late arrival rate
      // Base type: type/Float
      {
        type: "column",
        name: "late_arrival_rate",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: fOVcTfJT-0eHsoW-O9sgd
  // Description: Self-consistent only, no external reference. Average arrival delay of flights 15+ minutes late (58.9 min in 2015): how late a late flight is. Not comparable to Average arrival delay, which averages over every completed flight. Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Answers: how late are late flights, typical delay of a delayed flight. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  averageDelayWhenLate: {
    type: "metric",
    id: 104,
    name: "Average delay when late",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Average delay when late (min)
      // Base type: type/Float
      {
        type: "column",
        name: "avg_delay_when_late_min",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: 1t2FXOw-51UqMpzPTVC33
  // Description: Reconciled to BTS Table 1 "Summary of Airline On-Time Performance, Year-to-date through December 2015" on 2026-09-30: exact match, 5,819,079 operations. Count of scheduled flights, cancelled and diverted included. 14 airlines; US Airways January-June only. Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  flightsScheduled: {
    type: "metric",
    id: 101,
    name: "Flights scheduled",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Flights scheduled
      // Base type: type/Number
      {
        type: "column",
        name: "flights_scheduled",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: OMsw2VPT3wy7srBHHWTcg
  // Description: Self-consistent only, no external reference. Distinct customers with at least one order in the period (1,746 of 2,500 ever ordered). Not additive across months. Monthly by created_at; April 2020 is partial (data ends 2020-04-19); orders added through the app are dated when entered. Owner: ignacio@metabase.com.
  // Source table: Sample Database.public.orders
  customersOrdering: {
    type: "metric",
    id: 128,
    name: "Customers ordering",
    databaseId: 1,
    sourceTableId: 199,
    mappedTableIds: [ 199 ],
    columns: [
      // Display name: Customers ordering
      // Base type: type/Number
      {
        type: "column",
        name: "customers_ordering",
        jsType: "number"
      }
    ],
    dimensions: {
      orders: pickFields(tables.orders.fields, [ "createdAt", "discount", "id", "productId", "quantity", "subtotal", "tax", "total", "userId" ])
    }
  },
  // Entity ID: CbY8YJDpdLfL2Ux5g7xS1
  // Description: Self-consistent only, no external reference. People who signed up in the period, by People created_at (2,500 all time). Monthly by created_at; April 2020 is partial (data ends 2020-04-19); orders added through the app are dated when entered. Owner: ignacio@metabase.com.
  // Source table: Sample Database.public.people
  newCustomers: {
    type: "metric",
    id: 129,
    name: "New customers",
    databaseId: 1,
    sourceTableId: 200,
    mappedTableIds: [ 200 ],
    columns: [
      // Display name: New customers
      // Base type: type/Number
      {
        type: "column",
        name: "customers",
        jsType: "number"
      }
    ],
    dimensions: {
      people: pickFields(tables.people.fields, [ "address", "birthDate", "city", "createdAt", "email", "id", "latitude", "longitude", "name", "source", "state", "zip" ])
    }
  },
  // Entity ID: LQNZFgW3KMzZvsUm5uPRc
  // Description: Reconciled to BTS Table 1 "Summary of Airline On-Time Performance, Year-to-date through December 2015" on 2026-09-30: exact match, 1.54% (89,884 of 5,819,079). Share of scheduled flights that were cancelled. Not comparable to rates over completed flights. Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  cancellationRate: {
    type: "metric",
    id: 97,
    name: "Cancellation rate",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Cancellation rate
      // Base type: type/Float
      {
        type: "column",
        name: "cancellation_rate",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: 5PHsMw2Mow1j0de9PaHbC
  // Description: Self-consistent only, no external reference. Revenue divided by orders, USD ($85.04 all time). Monthly by created_at; April 2020 is partial (data ends 2020-04-19); orders added through the app are dated when entered. Owner: ignacio@metabase.com.
  // Source table: Sample Database.public.orders
  averageOrderValue: {
    type: "metric",
    id: 127,
    name: "Average order value",
    databaseId: 1,
    sourceTableId: 199,
    mappedTableIds: [ 199 ],
    columns: [
      // Display name: Average order value
      // Base type: type/Float
      {
        type: "column",
        name: "average_order_value",
        jsType: "number"
      }
    ],
    dimensions: {
      orders: pickFields(tables.orders.fields, [ "createdAt", "discount", "id", "productId", "quantity", "subtotal", "tax", "total", "userId" ])
    }
  },
  // Entity ID: TVKs6PcFsji-zWmIEzvj4
  // Description: Reconciled to BTS Table 1 "Summary of Airline On-Time Performance, Year-to-date through December 2015" (published 2016-02-11) on 2026-09-30: exact match, 79.92% on time; 5,819,079 operations, 1,063,439 late arrivals, 89,884 cancelled, 15,187 diverted. Share of scheduled flights that arrived less than 15 minutes after their scheduled arrival (DOT standard, D1). The denominator is every scheduled flight, so cancelled (1.54%) and diverted (0.26%) flights count as not on time (BTS convention, D2); over completed flights only the 2015 rate would read 81.39%. Dated by the local scheduled-departure date. Not comparable to departure punctuality or to rates over completed flights. Closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  onTimeArrivalRate: {
    type: "metric",
    id: 94,
    name: "On-time arrival rate",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: On-time arrival rate
      // Base type: type/Float
      {
        type: "column",
        name: "on_time_arrival_rate",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: x49rhkQVbavQ-QS9A8dMb
  // Description: Self-consistent only, no external reference. Average minutes late leaving the gate over flights that were not cancelled (9.34 min in 2015); early departures count as negative. Excludes 3,731 cancelled flights that left the gate (including them reads 9.37, D12). Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  averageDepartureDelay: {
    type: "metric",
    id: 103,
    name: "Average departure delay",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Average departure delay (min)
      // Base type: type/Float
      {
        type: "column",
        name: "avg_departure_delay_min",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: 84CsCTkVAu6J9wvWwSnLe
  // Description: Reconciled to BTS Table 1 "Summary of Airline On-Time Performance, Year-to-date through December 2015" on 2026-09-30: exact match, 18.14% (1,055,500 of 5,819,079). Share of scheduled flights that left the gate 15+ minutes late and were not cancelled (2,054 cancelled flights that left late are excluded, as BTS does). Dated by the local scheduled-departure date; closed 2015 extract, every month complete. Owner: ignacio@metabase.com.
  // Source table: Analytics.flight_analytics.mart_bts_fct_flight
  lateDepartureRate: {
    type: "metric",
    id: 100,
    name: "Late departure rate",
    databaseId: 2,
    sourceTableId: 415,
    mappedTableIds: [ 415 ],
    columns: [
      // Display name: Late departure rate
      // Base type: type/Float
      {
        type: "column",
        name: "late_departure_rate",
        jsType: "number"
      }
    ],
    dimensions: {
      martBtsFctFlight: pickFields(tables.martBtsFctFlight.fields, [ "airSystemDelayMin", "airTimeMin", "airlineCode", "airlineDelayMin", "airportCodeSource", "arrivalDelayMin", "arrivalTimeHhmm", "cancellationCause", "departureDelayMin", "departureTimeHhmm", "destinationAirportCode", "destinationAirportRaw", "distanceMiles", "elapsedTimeMin", "flightDate", "flightId", "flightNumber", "flightStatus", "isCancelled", "isCompletePeriod", "isCompleted", "isDiverted", "isLate15", "isOnTime", "lateAircraftDelayMin", "originAirportCode", "originAirportRaw", "route", "scheduledArrivalHhmm", "scheduledDepartureHhmm", "scheduledDepartureHour", "scheduledDepartureLocal", "scheduledTimeMin", "securityDelayMin", "tailNumber", "taxiInMin", "taxiOutMin", "weatherDelayMin" ])
    }
  },
  // Entity ID: MW6hqtBC01usErFWt37oc
  // Description: Self-consistent only, no external reference. Count of orders (18,760 historical). Monthly by created_at; April 2020 is partial (data ends 2020-04-19); orders added through the app are dated when entered. Owner: ignacio@metabase.com.
  // Source table: Sample Database.public.orders
  orders: {
    type: "metric",
    id: 126,
    name: "Orders",
    databaseId: 1,
    sourceTableId: 199,
    mappedTableIds: [ 199 ],
    columns: [
      // Display name: Orders
      // Base type: type/Number
      {
        type: "column",
        name: "orders",
        jsType: "number"
      }
    ],
    dimensions: {
      orders: pickFields(tables.orders.fields, [ "createdAt", "discount", "id", "productId", "quantity", "subtotal", "tax", "total", "userId" ])
    }
  }
} as const;

const schema = {
  schemaVersion: 2,
  generatedAt: "2026-09-30T17:24:23.097717504Z",
  metabase: {
    instanceUrl: "http://airline-flight-delays5.localhost:3208"
  },
  models: models,
  tables: tables,
  metrics: metrics
} as const;

export default schema;
