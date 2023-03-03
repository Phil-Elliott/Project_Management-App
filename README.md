# Simple Plan Project Management APP

![PM-Dashboard](https://user-images.githubusercontent.com/89685937/222329912-db0fae68-1fb6-4844-ba9e-a6f42f393296.png)

This is a React-based application designed for task tracking within a project. It enables users to create projects and tasks, as well as move tasks across various sections using drag-and-drop functionality. Each task includes key details such as its due date, description, a comments section, and the assigned members for streamlined collaboration.

## How it works

### Sign up

![SignIn-PM-App](https://user-images.githubusercontent.com/89685937/222330487-8401d4dd-45cd-4968-aa8c-180d2647711b.png)

Create an account or you can sign in with the demo account to get started. Once you're signed in, you'll be directed to your dashboard.

Demo Account:
Email: user@gmail.com
Password: user1234

### Projects page

![MainHub](https://user-images.githubusercontent.com/89685937/222331050-ede48efa-bc4f-41e9-b1de-757c0743baa1.gif)

At first, you'll see the projects page. Here, you can create a new project or choose from an existing one. You can select a project either from this screen or from the navigation menu on the left.

### Board component

![Board1](https://user-images.githubusercontent.com/89685937/222659584-b2729c08-06dd-4b73-a761-7967d69ecedd.gif)

Once you've selected a project, you'll be taken to the board component. This is where you can create task lists and tasks for those lists. You can move all the lists and tasks with drag and drop.

### List management

![Board2](https://user-images.githubusercontent.com/89685937/222659896-a0c1e72c-8c5b-4720-a4b8-24004bebe826.gif)

You can change the name of a list or delete it by pressing on the list's name or the ellipsis by the list's name.

### Task details

![Board3](https://user-images.githubusercontent.com/89685937/222660382-8bf191e4-5b92-4ce7-9a1b-bee9dd236f05.gif)

Each task can be clicked on to display a modal with the task's information. This includes the task's name, description, comments section, assigned members, watching, priority, and due date.

### Top section of the board

You'll find a search bar, invite button, and a settings button at the top section of the board.

### Search bar

Use the search bar to filter the tasks related to your search query.

### Invite button

Use the invite button to share the project with other users. This can be done by entering their email addresses.

### Settings button

The settings button is used to change the name or background of the project, as well as delete the project.

### Navigation menu

In the navigation menu on the left, you'll also see a profile button. This can be used to give or change your avatar, change your name, change your email, or delete your account.

## Software used

I used React, React Hooks, Redux, and Typescript to create the frontend of my app, providing a fast and intuitive user interface.

To enable drag and drop functionality, I utilized the popular library, React Beautiful DND. I used Axios to handle all fetch requests, ensuring fast and reliable data retrieval.

For styling, I chose SCSS, a popular CSS preprocessor that allowed me to create beautiful and consistent styles throughout the app.

Finally, I built my server with Strapi API, providing robust and secure backend functionality to ensure smooth and seamless operation of the app.

## What I learned

Working on this project was a valuable learning experience that helped me to significantly enhance my React and TypeScript skills. Specifically, I gained a deeper understanding of component architecture, state management, and code organization, which allowed me to create a more efficient and maintainable codebase.

In addition, I also improved my proficiency in integrating APIs into a React App. Through this project, I gained hands-on experience working with APIs, making requests, handling responses, and displaying data. This knowledge will be invaluable as I continue to work on similar projects in the future.

Overall, this project allowed me to build on my existing skills and expand my knowledge in key areas, giving me a more well-rounded skillset as a developer. I feel much more confident in my ability to build high-quality React apps with TypeScript and integrate APIs in a seamless and efficient manner. I look forward to applying these skills to future projects and continuing to grow as a developer.
