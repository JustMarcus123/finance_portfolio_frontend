# Financial Maintenance Platform — Frontend

A responsive React frontend for a full-stack employee retirement (401k) account management platform. Employees can view balances, adjust contribution percentages, and track investment performance. Administrators can manage enrollments and monitor plan activity.

**Live demo:** [financialrecord.vercel.app](https://financialrecord.vercel.app)
**Backend repo:** [financial_backend_java](https://github.com/JustMarcus123/financial_backend_java)

## Tech Stack

- **React.js** — component-based UI
- **JavaScript (ES6+)**
- **CSS** — responsive layout and styling
- **REST API integration** — communicates with a Java Spring Boot backend
- **Vercel** — deployment and hosting

## Features

- Secure login and authentication flow, with error handling for invalid credentials, unreachable backend, and network failures
- Dashboard for viewing account balances and contribution history
- Contribution percentage adjustment
- Investment performance tracking
- Admin view for managing employee enrollments and plan compliance
- Responsive design for desktop and mobile

## Project Structure

```
finance_portfolio_frontend/
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page-level views (Login, Dashboard, Admin, etc.)
    │   ├── services/      # API calls to the backend
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- The [backend service](https://github.com/JustMarcus123/financial_backend_java) running locally or accessible via API URL

### Installation

```bash
git clone https://github.com/JustMarcus123/finance_portfolio_frontend.git
cd finance_portfolio_frontend/frontend
npm install
```

### Environment Variables

Create a `.env` file in the `frontend` directory:

```
REACT_APP_API_BASE_URL=http://localhost:8080
```

### Run Locally

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

## Related Repository

This frontend connects to a Java Spring Boot + PostgreSQL backend that handles authentication, account management, contribution calculations, and transaction history. See [financial_backend_java](https://github.com/JustMarcus123/financial_backend_java) for setup instructions.

## Roadmap

- [ ] Improve login error handling for network/server failures (see [#7](https://github.com/JustMarcus123/finance_portfolio_frontend/issues/7))
- [ ] Add unit and integration tests
- [ ] Add statement export/download

## License

This project is for portfolio and demonstration purposes.
