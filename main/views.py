from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core import serializers
from datetime import datetime

from main.models import *
from main.forms import *
import json


def Login_request(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                request.session.set_expiry(1200)
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
        return render(request, 'main/contracts.html', {'contracts': contracts})
    else:
        return redirect('/login')


def Appendix(request):
    if request.user.is_authenticated:
        apendices = DetalleApendice.objects.all()
        contratos = ContratoCabecera.objects.all()
        vendedors = Vendedor.objects.all()
        estados = Estado.objects.all()
        apendices_cab = ApendiceCabecera.objects.all()
        arr = []
        for apend in apendices:
            try:
                value = round(apend.MARGEN/apend.VALOR_VENTA * 100, 1)
            except:
                value = 0
            arr.append({"apendice": apend, "amu": value})

        return render(request, 'main/appendix.html', {'apendices_cab': apendices_cab, 'apendices': apendices, 'contratos': contratos, 'vendedors': vendedors, 'estados': estados, "arr": arr})
    else:
        return redirect('/login')


def cliente(request):
    if request.user.is_authenticated:
        clientes = Cliente.objects.all()
        return render(request, 'main/cliente.html', {'clientes': clientes})
    else:
        return redirect('/login')


def contacto(request):
    if request.user.is_authenticated:
        contactos = Contacto.objects.all()
        return render(request, 'main/contacto.html', {'contactos': contactos})
    else:
        return redirect('/login')


def grupocliente(request):
    if request.user.is_authenticated:
        grupoclientes = GrupoCliente.objects.all()
        return render(request, 'main/grupo_cliente.html', {'grupoclientes': grupoclientes})
    else:
        return redirect('/login')
        

def producto(request):
    if request.user.is_authenticated:
        productos = Producto.objects.all()
        return render(request, 'main/producto.html', {'productos': productos})
    else:
        return redirect('/login')


def create(request):
    if request.method == 'POST':
        selection = request.POST.get('selection', None)
        if selection == "contrato":
            form = ContratoCabeceraForm(request.POST)
        if selection == "apendice":
            form = ApendiceCabeceraForm(request.POST)
        if selection == "cliente":
            form = ClienteForm(request.POST)
        if selection == "contacto":
            form = ContactoForm(request.POST)
        if selection == "grupo_cliente":
            form = GrupoClienteForm(request.POST)
        if selection == "producto":
            form = ProductoForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return JsonResponse({"status": 'ok', "message": "success"})
            except Exception as e:
                print(e)
        else:
            print(form.errors)
            return JsonResponse({"status": 'error', "message": "failed."})
    return redirect("/contracts")


def readdata(request, id):
    if request.method == 'POST':
        if request.POST.get('selection', None)=="contrato":
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
            if id != 1000000:
                return JsonResponse({"status": 'ok', "message": "success", "contract": contract[0]['fields'], "proveedor":proveedor, "unidad_negocio":unidad_negocio, "sociedad":sociedad, "pais":pais, "cliente":cliente, "contacto":contacto, "tipo_contrato":tipo_contrato, "region":region})
            else:
                return JsonResponse({"status": 'ok', "message": "success", "proveedor":proveedor, "unidad_negocio":unidad_negocio, "sociedad":sociedad, "pais":pais, "cliente":cliente, "contacto":contacto, "tipo_contrato":tipo_contrato, "region":region})
        if request.POST.get('selection', None)=="apendice":
            if id != 1000000:
                apendice = ApendiceCabecera.objects.filter(ID_APENDICE = id)
                apendice = serializer(apendice)
            else:
                pass
            contrato = serializer(ContratoCabecera.objects.all())
            contacto = serializer(Contacto.objects.all())
            vendedor = serializer(Vendedor.objects.all())
            estado = serializer(Estado.objects.all())
            tipo_producto = serializer(TipoProducto.objects.all())
            if id != 1000000:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "apendice": apendice[0]['fields'], "contrato": contrato, "contacto": contacto,
                     "vendedor": vendedor, "estado": estado})
            else:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "contrato": contrato, "contacto": contacto,
                     "vendedor": vendedor, "estado": estado})
        if request.POST.get('selection', None)=="cliente":
            if id != 1000000:
                cliente = Cliente.objects.filter(ID_CLIENTE=id)
                cliente = serializer(cliente)
            else:
                pass
            pais = serializer(Pais.objects.all())
            industria = serializer(Industria.objects.all())
            grupo_cliente = serializer(GrupoCliente.objects.all())
            if id != 1000000:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "cliente": cliente[0]['fields'], "pais": pais, "industria": industria,
                     "grupo_cliente": grupo_cliente})
            else:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "pais": pais, "industria": industria,
                     "grupo_cliente": grupo_cliente})
        if request.POST.get('selection', None)=="contacto":
            if id != 1000000:
                contacto = Contacto.objects.filter(ID_CONTACTO=id)
                contacto = serializer(contacto)
            else:
                pass
            cliente = serializer(Cliente.objects.all())
            if id != 1000000:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "contacto": contacto[0]['fields'], "cliente": cliente})
            else:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "cliente": cliente})
        if request.POST.get('selection', None)=="grupo_cliente":
            if id != 1000000:
                grupo_cliente = GrupoCliente.objects.filter(ID_GRUPO_CLIENTE=id)
                grupo_cliente = serializer(grupo_cliente)
            else:
                pass
            if id != 1000000:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "grupo_cliente": grupo_cliente[0]['fields']})
            else:
                return JsonResponse(
                    {"status": 'ok', "message": "success"})
        if request.POST.get('selection', None)=="producto":
            if id != 1000000:
                producto = Producto.objects.filter(ID_PRODUCTO=id)
                producto = serializer(producto)
            else:
                pass
            tipo_producto = serializer(TipoProducto.objects.all())
            if id != 1000000:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "producto": producto[0]['fields'], "tipo_producto": tipo_producto})
            else:
                return JsonResponse(
                    {"status": 'ok', "message": "success", "tipo_producto": tipo_producto})


def update(request, id):
    if request.method == 'POST':
        selection = request.POST.get('selection', None)
        if selection == "contrato":
            contract = ContratoCabecera.objects.get(ID_CONTRATO=id)
            form = ContratoCabeceraForm(request.POST, instance=contract)
        if selection == "cliente":
            print("ok")
            cliente = Cliente.objects.get(ID_CLIENTE=id)
            form = ClienteForm(request.POST, instance=cliente)
        if selection == "apendice":
            apendice = ApendiceCabecera.objects.get(ID_APENDICE=id)
            form = ApendiceCabeceraForm(request.POST, instance=apendice)
        if selection == "contacto":
            contacto = Contacto.objects.get(ID_CONTACTO=id)
            form = ContactoForm(request.POST, instance=contacto)
        if selection == "grupo_cliente":
            grupo_cliente = GrupoCliente.objects.get(ID_GRUPO_CLIENTE=id)
            form = GrupoClienteForm(request.POST, instance=grupo_cliente)
        if selection == "producto":
            producto = Producto.objects.get(ID_PRODUCTO=id)
            form = ProductoForm(request.POST, instance=producto)

        if form.is_valid():
            try:
                form.save()
                return JsonResponse({"status": 'ok', "message": "success"})
            except:
                pass
        else:
            print(form.errors)
            return JsonResponse({"status": 'error', "message": "failed."})


def delete(request, id):
    if request.method == 'POST':
        if request.POST.get('selection', None) == "contrato":
            contract = ContratoCabecera.objects.get(ID_CONTRATO=id)
            contract.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})
        if request.POST.get('selection', None) == "apendice":
            apendice = ApendiceCabecera.objects.get(ID_APENDICE=id)
            apendice.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})
        if request.POST.get('selection', None) == "cliente":
            cliente = Cliente.objects.get(ID_CLIENTE=id)
            cliente.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})
        if request.POST.get('selection', None) == "contacto":
            contacto = Contacto.objects.get(ID_CONTACTO=id)
            contacto.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})
        if request.POST.get('selection', None) == "grupo_cliente":
            grupo_cliente = GrupoCliente.objects.get(ID_GRUPO_CLIENTE=id)
            grupo_cliente.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})
        if request.POST.get('selection', None) == "producto":
            producto = Producto.objects.get(ID_PRODUCTO=id)
            producto.delete()
            return JsonResponse({"status": 'ok', "message": 'success'})