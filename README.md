# Certify Backend

Certify Backend is the server-side component of the Certify platform [https://github.com/raj-saroj-vst-au4/certify]('https://github.com/raj-saroj-vst-au4/certify') , handling certificate generation, validation, and database operations.

## Features

- **Certificate Generation**: Generate certificates for courses and events.
- **Validation Endpoint**: Provides an endpoint for validating certificates.
- **Database Operations**: Handles database interactions for certificate data.
- **Tech Stack**: Express, Node.js, Prisma, Puppeteer.

## Tech Stack

Certify Backend utilizes a powerful tech stack to manage the server-side functionalities:

- **Express**: Used as the backend framework to handle HTTP requests and routing.
- **Node.js**: Provides the runtime environment for executing JavaScript code.
- **Prisma**: Manages database operations and offers an ORM for easy access.
- **Puppeteer**: Utilized for generating PDF certificates.
- **Cloudinary**: Storing generated PDF in CDN for future access

## Installation

To set up the Certify Backend locally, follow these steps:

1. Clone the repository: `git clone https://github.com/raj-saroj-vst-au4/certify-backend`
2. Navigate to the project directory: `cd certify-backend`
3. Install dependencies: `npm install`
4. Set up the environment variables as per `.env.example`.

## Usage

Start the Certify Backend server using:

```bash
npm run dev
```

The server will run on `http://localhost:YOUR_PORT`.

### API Endpoints

- **Certificate Generation**:
  - Endpoint: `/generatepdf`
  - Method: POST
  - Payload: { mailid, digits }

- **Generated Certificate Download**:
  - Endpoint: `/certifydown/:certid`
  - Method: GET
  - Response: { certificate.pdf }
    
- **Fetch Certificate Data**:
  - Endpoint: `/fetchcertdata`
  - Method: POST
  - Payload: { certid }
  - Response: { certificate data with student data }

## Contributing

Contributions are appreciated! To contribute to Certify Backend:

1. Fork the repository.
2. Create your branch: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m 'Add NewFeature'`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
