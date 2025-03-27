# Student Record Management System (SRMS)

Overview
The **Student Record Management System (SRMS)** is a web-based application designed for **IIT Ropar professors** to efficiently manage student records. This system allows professors to create and manage classrooms, add, edit, and delete student records, and track academic performance securely.

# Deployment Note

### Deployment Status

Due to time constraints, I was unable to fully integrate and deploy the frontend and backend together under a single domain with HTTPS (SSL certificate). Setting up a secure connection (SSL) requires additional configuration and time, which was not feasible within the given deadline.

### Current Deployment Approach

As an alternative, I have deployed the frontend and backend separately:

- **Frontend**: Hosted on **Vercel**
    - Live URL: [https://resollect-ashy.vercel.app](https://resollect-ashy.vercel.app/)
- **Backend**: Hosted on **AWS EC2** (Ubuntu instance)
    - API Base URL: [http://16.17.129.209:8000](http://16.17.129.209:8000/)

### Challenges Faced

1. **SSL Certificate Requirement**:
    - A secure HTTPS connection was needed for frontend-backend communication (CORS policies, JWT security).
    - Configuring SSL (e.g., via Let’s Encrypt, Nginx reverse proxy) would have required additional setup time.
2. **Time Constraints**:
    - Due to project deadlines, I prioritized functional deployment over full integration.

### Future Improvements

- **Full Integration**: Deploy both frontend and backend under a single domain with HTTPS
- **Automated CI/CD**: Implement GitHub Actions or similar for seamless updates.
  
## Features
- **Classroom Management**: Create and manage courses/subjects.
- **Student Records**: Add, edit, and delete student details (entry number, attendance, marks).
- **Search & Filter**: Search by student name, filter by batch, grade, or attendance.
- **Pagination**: View records in paginated form (7 per page).
- **Secure Access**: JWT authentication for professor-only privileges.

## Tech Stack
### Backend
- **Framework**: Django + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (SimpleJWT)
- **APIs**: RESTful
- **Libraries**: django-cors-headers, psycopg2

### Frontend
- **Framework**: React.js
- **Styling**: CSS Modules
- **Routing**: React Router
- **HTTP Client**: Axios
- **UI Components**: Navbar, Student List, Student Form, Login, Signup
- **Alerts**: SweetAlert for notifications

## Installation
### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/ashishsai960/Resollect.git
   cd Resollect/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure the database in `settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'resollect_db',
           'USER': 'your_user',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `api/student/create/` | POST | Create a new student |
| `api/student/list/` | POST | List all students |
| `api/student/update/<int:student_id>/` | PATCH | Update student records |
| `api/student/delete/<int:student_id>/` | POST | Delete a student record |
| `api/student/filter/` | GET | Search by student name |
| `api/student/group/<str:group_by>/` | GET | Filter by batch |
| `api/accounts/signup/` | POST | Signup for professors |
| `api/accounts/login/` | POST | Login for professors |


## Links
- **GitHub Repository**: [https://github.com/ashishsai960/Resollect.git](https://github.com/ashishsai960/Resollect.git)
- **Frontend**: [https://resollect-ashy.vercel.app](https://resollect-ashy.vercel.app)

## Author
**Lakavath Ashish Sai Naik**  
Entry Number: 2021CHB1046  
GitHub: [ashishsai960](https://github.com/ashishsai960)
