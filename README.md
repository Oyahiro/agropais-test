# Agropais Ecuador - Technical Test

This is a technical test project developed for **Agropais Ecuador**, built using [Next.js](https://nextjs.org) and
deployed on [Vercel](https://vercel.com). The application is designed to manage information about users, farms, crops,
and workers, providing a user-friendly interface for CRUD operations and data visualization.

## Features

- **User Management**:
    - Add, edit, and delete user information including name, date of birth, gender, CI, and RUC data.
    - Manage family members related to each user.
- **Farm Management**:
    - Add details about user-owned farms including the farm name, size (in hectares), and types of crops.
    - Conditional input handling for farms based on user selection.
- **Crops Management**:
    - Display a summary of crops using a data table with counts of each crop type.
    - Fetch and display crop data in a responsive table with sorting capabilities.
- **Workers Management**:
    - Manage details about workers employed on the farm, including total count, gender breakdown, age group breakdown,
      and special conditions like pregnant workers.
- **Data Validation**:
    - Uses **Yup** for schema validation with custom rules (e.g., CI and RUC validation, age checks).
    - Dynamic form validation based on user inputs, such as requiring certain fields when others are selected.
- **Responsive Design**:
    - The UI is designed to be responsive, adapting to different screen sizes.
    - Uses Tailwind CSS for a modern and clean design.
- **Smooth User Interactions**:
    - Animations with **Framer Motion** for expanding and collapsing form sections.
    - Custom skeleton loaders to provide feedback while data is being loaded.
- **State Management**:
    - Uses **Zustand** for global state management, allowing seamless interaction between components, such as selecting
      a user for editing.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org) with App Router.
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for utility-first, responsive design.
- **UI**: [Shadcn](https://ui.shadcn.com/) for a modern and customizable UI library.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth UI animations.
- **Validation**: [Yup](https://github.com/jquense/yup) with [React Hook Form](https://react-hook-form.com) for form
  validation and error handling.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for global state handling.
- **Data Fetching**: API routes with [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) and
  server-side data fetching for improved performance.
- **Deployment**: Hosted on [Vercel](https://vercel.com) for seamless deployment and scaling.
- **Db**: Hosted on [Supabase](https://supabase.com) for scalable and secure database management.

## Getting Started

To run the development server, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/agropais-ecuador.git
   cd agropais-ecuador

2. Install dependencies:

   ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install

3. Set up environment variables:
   Create a .env.local file in the root directory and add your environment variables, such as:

   ```bash
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run the development server:

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev

5. Open http://localhost:3000 in your browser to see the result.

## Technologies Used

- GET /api/users: Retrieve a list of all users.
- POST /api/users: Create a new user.
- PUT /api/users/: Update an existing user.
- DELETE /api/users/: Delete a user.
- GET /api/crops: Retrieve a list of all crops.

## Deployment

This project is deployed using [Vercel](https://vercel.com). To deploy your own version:

1. Push your code to a GitHub repository.
2. Sign in to Vercel and import your repository.
3. Follow the setup instructions, and Vercel will automatically build and deploy your app.
4.

## Learn More

To learn more about the tools and frameworks used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to style your app with utility classes.
- [Framer Motion Documentation](https://www.framer.com/motion/) - Learn how to create animations.
- [React Hook Form Documentation](https://react-hook-form.com) - Learn about form handling in React.

## License

This project is licensed for the purpose of a technical test for **Agropais Ecuador**. All rights reserved.
