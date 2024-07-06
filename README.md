---

# SyntaxScribe

SyntaxScribe is a comprehensive MERN stack application with Redux Toolkit for state management. It allows users to explore, publish, and interact with posts about JavaScript syntax, offering a community-driven platform for sharing coding knowledge.

## Features

### User Roles
- **Normal User:** Explore posts by other users.
- **Author User:** Publish, update, and delete their own posts.

### Post Management
- **Posts:** Users can create posts about different JavaScript methods, classes, or boilerplate code.
- **Interactions:** Other users can like, save, and comment on posts.
- **Featured Solutions:** The home page displays the top 6 posts.
- **Search:** Search bar for coding queries, fetching results based on keywords.
- **Filter:** Filter posts by likes or dates.
- **Trending Questions:** Users will see trending questions that have not been answered after logging in, encouraging them to create posts addressing these questions.

### User Interaction
- **Follow:** Users can follow each other and view posts by visiting their profiles.
- **Account Management:** Users can update their email and password.

### CSS Playground
- **Tailwind CSS Editor:** Users can write Tailwind CSS in an editor and see live updates in a preview div.

### Notifications
- **Custom Pop-ups:** Notifications using `setTimeout` and Redux Toolkit.

## Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Hosting:** Render (Server), Netlify (Client)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sagardubey14/Tech-Blog.git
   cd Tech-Blog
   ```

2. **Install dependencies:**

   - **Backend:**
     ```sh
     cd server
     npm install
     ```

   - **Frontend:**
     ```sh
     cd client
     npm install
     ```

3. **Create `.env` files and add your environment variables:**

   - **Server:**
     ```env
     DB_URL=your_mongodb_connection_string
     PORT=your_server_port
     SECRET_KEY=your_jwt_secret
     REACT_URL=your_react_app_url
     ```

   - **Client:**
     ```env
     VITE_API_URL=your_api_url
     ```

4. **Run the application:**

   - **Backend:**
     ```sh
     cd server
     npm start
     ```

   - **Frontend:**
     ```sh
     cd client
     npm run dev
     ```

## Usage

- **Explore Posts:** Visit the home page to view featured solutions and use the search bar for specific queries.
- **Publish Posts:** Register or log in to your account to create and manage your posts.
- **Interact with Posts:** Like, save, comment on posts, and follow other users to stay updated with their content.
- **CSS Playground:** Navigate to the CSS playground to experiment with Tailwind CSS.

## Project Link

[SyntaxScribe](https://syntaxscribe.netlify.app)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact sagardubey353@gmail.com .

---