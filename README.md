
# Civvy 

Civvy combines education and community engagement into one streamlined experience:

## Features

- **Learn:** A learning platform where users can pick topics to learn and each topic includes modules with educational content followed by interactive quizzes. Users earn experience points (EXP) as they complete modules, track their progress, and save completed courses.

- **Connect:** An events page where users can create, join, and organize local gatherings. These events can focus on activities such as voter registration drives, civic education workshops, or community discussions about political issues. The "Joined Events" tab makes it easy for users to keep track of their participation.

- **User Profiles:** Each user has a profile with their progress stats, completed modules, and a navigation hub to access other features easily.

- **Landing Page:** A polished front page to introduce Civvy’s features, creating a welcoming entry point for new users.

## Tech Stack


- Clerk
- Convex
- React-Native
- Expo
## Environment Variables

To run this project, add the following environment variables to your .env file in the civvy folder. Ensure these resources are created in Clerk and Convex before running the application:

Clerk setup: https://clerk.com/docs/quickstarts/setup-clerk

Clerk Link to setup with Convex: https://clerk.com/docs/integrations/databases/convex

Convex link to setup with Clerk: https://docs.convex.dev/auth/clerk 



```
CONVEX_DEPLOYMENT=<Your API Key>
EXPO_PUBLIC_CONVEX_URL=<Your API Key>
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<Your API Key>
```


## Run Locally (You will need to setup the Azure Resources)

Clone the project

```bash
  git clone https://github.com/WuVi5054/Civvy.git
```
Go to the project directory 
```bash
  cd civvy
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```

Start the backend server

```bash
  npx convex dev
```

## Future Improvements

- **Expand Learning Modules:** Add more topics and diversify the topics as well. Enable user-generated content for more diverse learning materials.
- **Gamification Features:** Introduce badges, leaderboards, and streak tracking to further engage users.
- **Enhanced Events System:** Allow users to filter and search events by location or topic. Add features for event chat and reminders.
- **Mobile App:** Expand iOS support and develop an Android app to reach a wider audience.
- **Localization:** Add multilingual support to make Civvy accessible to non-English speakers.
- **Partner with Organizations:** Collaborate with nonprofits and civic groups to provide verified educational content and promote local events.
- **Voter Registration Page:** Implement a custom page to perform voter registration per state.
