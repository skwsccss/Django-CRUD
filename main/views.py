from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core import serializers
from main.models import *
from main.forms import *
import json

def invoice(request):
    if request.user.is_authenticated:
        return render(request, 'main/invoice.html')
    else:
        return redirect('/login')


def contracts(request):
    if request.user.is_authenticated:
        contracts = ContractsModel.objects.all()
        return render(request, 'main/contracts.html', {'contracts': contracts})
    else:
        return redirect('/login')


def Appendix(request):
    if request.user.is_authenticated:
        return render(request, 'main/appendix.html')
    else:
        return redirect('/login')


def Login_request(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/invoice')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request,
                  template_name="main/login.html",
                  context={"form": form})


def Logout_request(request):
    logout(request)

    return redirect('/login/')


def Changepassword(request):
    if request.method == 'POST':
        currentpwd = request.POST.get('currentpwd', None)
        newpwd = request.POST.get('newpwd', None)
        username = request.user.username
        a_user = authenticate(username=username, password=currentpwd)
        if a_user is not None:
            users = User.objects.filter(username=username)
            user = users[0]
            user.set_password(newpwd)
            user.save()
            return JsonResponse({"status": 'ok', "message": "success"})
        else:
            return JsonResponse({"status": 'error', "message": "Current password is incorrect."})

    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'main/login.html', {'form': form})


def GetUserName(request):
    if request.method == 'GET':
        username = request.user.username
        users = User.objects.filter(username=username)
        user = users[0]
        email = user.email
        return JsonResponse({"username": username, "email": email})


def getdata(request, id):

    if request.method == 'GET':
        contract = ContractsModel.objects.filter(id=id)
        contract_json = serializers.serialize("json", contract)
        contract = json.loads(contract_json)
        return JsonResponse({"status": 'ok', "message": "success", "contract": contract[0]['fields']})



def update(request, id):
    if request.method == 'POST':
        contract = ContractsModel.objects.get(id=id)
        selection = request.POST.get('selection', None)
        if selection == "1":
            form = ContractsForm(request.POST, instance=contract)
        if selection == "2":
            form = InvoiceForm(request.POST)
        if selection == "3":
            form = AppendixForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return JsonResponse({"status": 'ok', "message": "success"})
            except:
                pass
        else:
            return JsonResponse({"status": 'error', "message": "failed."})

def delete(request, id):
    contract = ContractsModel.objects.get(id=id)
    contract.delete()
    return redirect("/contracts")


def Add(request):
    if request.method == 'POST':
        selection = request.POST.get('selection', None)
        if selection == "1":
            form = ContractsForm(request.POST)
        if selection == "2":
            form = InvoiceForm(request.POST)
        if selection == "3":
            form = AppendixForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return JsonResponse({"status": 'ok', "message": "success"})
            except:
                pass
        else:
            return JsonResponse({"status": 'error', "message": "failed."})
    return redirect("/contracts")
