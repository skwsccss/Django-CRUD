from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib import messages
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


def serializer(val):
    return json.loads(serializers.serialize("json", val))


def contracts(request):
    if request.user.is_authenticated:
        contracts = ContratoCabecera.objects.all()
        proveedors = Proveedor.objects.all()
        return render(request, 'main/contracts.html', {'contracts': contracts, 'proveedors':proveedors})
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
        if id != 1000000:
            contract = ContratoCabecera.objects.filter(ID_CONTRATO=id)
            contract = serializer(contract)
        else:
            pass
        proveedor = serializer(Proveedor.objects.all())
        unidad_negocio = serializer(UnidadNegocio.objects.all())
        sociedad = serializer(Sociedad.objects.all())
        pais = serializer(Pais.objects.all())
        cliente = serializer(Cliente.objects.all())
        contacto = serializer(Contacto.objects.all())
        tipo_contrato = serializer(TipoContrato.objects.all())
        region = serializer(Region.objects.all())
        # contract_json = serializers.serialize("json", contract)
        # contract = json.loads(contract_json)
        
        # print(contract[0]['fields'])
        if id != 1000000:
            return JsonResponse({"status": 'ok', "message": "success", "contract": contract[0]['fields'], "proveedor":proveedor, "unidad_negocio":unidad_negocio, "sociedad":sociedad, "pais":pais, "cliente":cliente, "contacto":contacto, "tipo_contrato":tipo_contrato, "region":region})
        else:
            return JsonResponse({"status": 'ok', "message": "success", "proveedor":proveedor, "unidad_negocio":unidad_negocio, "sociedad":sociedad, "pais":pais, "cliente":cliente, "contacto":contacto, "tipo_contrato":tipo_contrato, "region":region})


def update(request, id):
    if request.method == 'POST':
        contract = ContratoCabecera.objects.get(ID_CONTRATO=id)
        selection = request.POST.get('selection', None)
        if selection == "1":
            form = ContratoCabeceraForm(request.POST, instance=contract)
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
    if request.method == 'POST':
        if request.POST.get('selection', None) == "1":
            print(id)
            contract = ContratoCabecera.objects.get(ID_CONTRATO=id)
            contract.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})


def Add(request):
    if request.method == 'POST':
        selection = request.POST.get('selection', None)
        if selection == "1":
            form = ContratoCabeceraForm(request.POST)
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
