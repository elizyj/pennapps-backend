# PennApps Backend Technical Challenge

Welcome to the backend challenge! The purpose of this challenge is to help us gauge your level of interest and your abilities while also allowing you to get a feel for the type of stuff we work on. While the challenge will be judged based off of correctness and overall design, *we do not expect you to get everything 100%*! What we are looking for most is **effort and thought**. You should not need to spend more than **3 hours** on it. 

## Introduction

For the backend challenge, you will implement a mini version of our application portal that hackers use to register an account and create an application for PennApps. You will implement an account system taking use of Django's inbuilt user account system that will allow the users to register for an account and login/logout. Afterwards you will implement the application system to allow users to create applications which will store relevant information as well as the user's team.  

Throughout the project you should focus on how to best model the data and understand the relationships among them. You will also be responsible for understanding the starter code provided for you and reading Django documentation to help you with this challenge.

If you are not familiar with Django at all, consider checking out the [Django pollapp tutorial](https://docs.djangoproject.com/en/4.1/intro/tutorial01/) first which can also be found on the Django documentation website. Note for this challenge you are not expected to do a lot of frontend; **we provide all the templates, and you will need to modify these very slightly at most**. 

## Installation

Click the green "use this template" button to make your own copy of this repository, and clone it. Make sure to create a private repository. Clone the repo to your local machine for development. 

Once you have opened the project in your favorite IDE (VSCode or PyCharm are good options), make sure you have Django installed. 
- One way to do this is with pipenv. First install it with `pip install --user --upgrade pipenv` and then run `pipenv install` to install everything in the included `Pipfile` which is just Django for this project. Once installed, run `pipenv shell` to activate the environment (you will run all subsequent Django commands in this shell). Use `exit` to exit. 
  - If you get an error try: `python -m pipenv install` and `python -m pipenv shell` (or `python3` instead of `python`)
- Alternatively, `python -m pip install Django` should work but see documentation [here](https://docs.djangoproject.com/en/4.1/topics/install/#installing-official-release). 

Make sure to check that it has properly installed by running `python -m django --version`. 

Now you should be able to get the project up and running. In your terminal, on the same directory as `manage.py`, run `python manage.py runserver` (you may have to use `python3` instead of `python` for this and all other Django commands). This should start running the server locally usually on `127.0.0.1:8000` or `localhost:8000`. Close this with `Ctrl+C`.
- If you get an error "Dependency on app with no migrations: pennapps", run `python manage.py makemigrations` followed by `python manage.py migrate`. Trying to run the server after this should work.

## The Challenge

### Part 0: The Basics
To start, make sure you are in the directory that contains `manage.py`. This is the root directory of your project. There should be two more subdirectories here: 
- PennAppsChallenge - you can think of this as the entry point to our Django application. Two important files it contains is `settings.py` which contains our project settings and `urls.py` which tells our app which urls to keep an eye out for (more on this later).
- pennapps - this is an "app" that we created beforehand which contains some starter code for you. Django projects can consist of many "apps" that are usually created with `python manage.py startapp app_name` (think an app as an isolated piece of "business logic" that work together in the overall app) but ours will only use one since our project is quite basic. You will mainly be working in this directory.

*Now, in order to tell Django that pennapps is an "app" in our project, make sure `'pennapps.apps.PennappsConfig'` is in the list of installed apps in our `settings.py`.*

#### URLs and Views
Next, let's understand how the url flow works. Visit`PennAppsChallenge/urls.py`. Recall that this contains all the relevant urls to our project which is listed in `urlpatterns`. The first entry here,`path('admin/', admin.site.urls)`, tells Django to put the admin site on `/admin/` and the second entry, `path('', include('pennapps.urls'))` tells Django to include all the urls found in `pennapps.url` (`urls.py` in the pennapps subdirectory). Visiting `pennapps/urls.py` we see a similar `urlpatterns` list. Note however that these urls would not have been added to our Django application by default if we hadn't specified to include these urls in `PennAppsChallenge/urls.py`. 

*Visit the homepage `127.0.0.1:8000` or the login page `127.0.0.1:8000/application/` to verify the urls are working.* 

Finally, let's understand what a view is. Visiting `views.py`, we see that each view seems to be a function that takes a request parameter (however other types of views can exist like class based views which you may or may not employ in your challenge). If we look at a specific path in `pennapps/urls.py`, we see each path takes a route like `/application/` and a view like `views.application` to specify what we want Django to do when we hit that route. In this case, when a user visits `127.0.0.1:8000/application/`, `views.application` will be called which currently just renders the html template `application.html`. The request parameter, then, specifies the type of request made and so on. Views are where most of your logic will take place.

#### models.py
This is where the model definitions for our application is located (usually there is 1 `models.py` file for each app in our project). Check out the documentation on [models in Django](https://docs.djangoproject.com/en/4.1/topics/db/models/) if you are not familiar. For more querying on models, see [here](https://docs.djangoproject.com/en/4.1/topics/db/queries/). *Feel free to modify the models however you see fit as you develop*. You'll notice there's already 2 models defined here:
- `Applicant`: inherits from Django's `AbstractUser` model to take advantage of functionality already provided by Django's User model. One thing this will be useful for in this project is to allow Django to help us deal with authentication. Since we are inheriting from Django's provided User model, we also inherit all of the fields such as `username` and `password` while being to add out own like `is_penn_student`. 
- `Application`: This represents an application that an Applicant (User) can create (we link the two together using a one-to-one relationship). Currently, it just tracks the application status but you will add to this later. 

*Check to make sure `AUTH_USER_MODEL = "pennapps.Applicant"` has been added to the settings to make sure Django knows we will be using the Applicant model for authentication purposes*.

***Note that everytime `models.py` is changed you may need to rerun `python manage.py makemigrations` and `python manage.py migrate` to make sure the database is up to date with the latest changes.*** *(The database instance for development is just the file db.sqlite3 but it is treated as a database).*

### Part 1: Authentication

You will implement the authentication system consisting of registering, logging in and logging out. Note, we've provided the necessary templates for login/signup but they are not yet used anywhere. We recommend they be implemented in the following order:
- logging in
- logging out (also link the logout button on the homepage to be able to logout)
- registering

We encourage you to look at the Django documentation first as the logging in/out can be implemented especially quickly as Django provides a lot of out of the box functionality for this. Taking advantage of pre-built functionality is a good thing and we will view this as a good design decision and a sign of resourcefulness!


*To test logging in/out before allowing users to register run `python manage.py createsuperuser`. This will prompt you to create an admin user which you can use to test with. Additionally consider checking out the admin portal at the `/admin/` route where you can login with your admin user where you can create/modify instances of you model like creating more users.* 

**Bonus**: Once authentication is complete also make some routes like the homepage,`/`, protected so that only authenticated users can access it. Consider which routes should be protected and what should happen when a non-authenticated user visits protected routes and vice versa.  

### Part 2: User Application

Now we need to have a way to allow users to submit applications. By default, users have no applications associated with them so you will have to allow users to create one. 

- Link the link on the homepage to the application page.
- Go to `/application` to view the list of fields relevant to an application. Modify `models.py` to support these fields. You may or may not need to make additional models to best model the data. (Make sure to run `python manage.py makemigrations` and `python manage.py migrate` afterwards.)
  - If you create a new model you may need to register this in `admin.py` to view it in the admin portal.
- Now implement application creation!! This is open ended on purpose.
- Display the application status on the homepage. By default, this is set to "Processing" (see `models.py`) but the idea is an admin can use the admin portal to change this as we accept/reject/waitlist applicants to PennApps. 

**Bonus**: make it so that users can only add teammates that are valid users (i.e. the email address entered is associated with a user) and also make it so that if one user has added 3 other teammates to be on a team (of 4) when each of the 3 other teammates go to create an application, the other 3 teammates on their team will have their emails pre-populated. You may assume that if this occurs, the other teammates will not change the teams around (if Alice has added Bob, Charlie, and Daniel, Bob, Charlie, and Daniel will not change the pre-populated emails on their applications).

### Part 3: Bonus
Besides the two bonuses mentioned above feel free to attempt any of the following bonuses. You are free to install other packages to help complete these challenges (We use 22 different packages in our project!). 

1. Allow users to edit their applications. Their old information should pre-populate the form so they don't need to re-enter everything.
2. You may or may not have already done this but using Django forms is a great way to reduce writing generic code. Take some time to learn how to use this and refactor your code to use this. (May or may not lead you down a rabbit hole). 
3. Explore [template tags and filters](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/) and see how you can implement them in your project or create a use case. Or if none of them fits your need create a [custom](https://docs.djangoproject.com/en/4.1/howto/custom-template-tags/) one.
4. Make the admin portal look nicer/easier to use. For example we may want to view all applications that are "processing" or "waitlisted". Or be able to access an user's application from the applicant view. Since we use the admin portal for a lot of administrative things for PennApps this is important to us, so experiment with creating a  better user experience for the admins.
5. Anything else you want! Make sure you document it in your `README`.

## Documentation

To help us better understand your design process and not miss any feature you may have implemented, document your decisions and what you want to highlight in a `README`. If you're not sure what do document, briefly explain how you addressed each challenge/bonus challenge. As programmers, being able to explain our work and thought process is crucial to working on a team!

## Submission

Once you are done, create a ZIP file of your project which you can submit on the submission form. (If you code is pushed to GitHub, clicking the green "Code" dropdown, and then "Download ZIP" is one way to do so.) Congrats, you just made a mini hackathon application portal!
