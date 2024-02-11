from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.forms import ModelForm
from .models import Application

# Create your views here.
@login_required
def index(request):
    return render(request, 'pennapps/index.html')

def application(request):
    return render(request, 'pennapps/application.html')

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  # Redirect to a success page.
        else:
            return render(request, 'pennapps/login.html', {'error_message': 'Invalid login'})
    else:
        return render(request, 'pennapps/login.html')
    
def user_logout(request):
    logout(request)
    return redirect('index')  # Redirect to homepage or login page

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirect to the login page after successful registration
    else:
        form = UserCreationForm()
    return render(request, 'pennapps/signup.html', {'form': form})


class ApplicationForm(ModelForm):
    class Meta:
        model = Application
        fields = ['project_idea', 'skills', 'resume']

@login_required
def create_application(request):
    if request.method == 'POST':
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.applicant = request.user
            application.save()
            return redirect('/')
    else:
        form = ApplicationForm()
    return render(request, 'pennapps/application_form.html', {'form': form})

def index(request):
    application_status = 'No Application Submitted'
    if request.user.is_authenticated:
        try:
            application = Application.objects.get(applicant=request.user)
            application_status = application.get_status_display()  # Converts
        except Application.DoesNotExist:
            pass  # Keeps the default message 
    return render(request, 'pennapps/index.html', {'application_status': application_status})