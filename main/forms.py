from django import forms
from main.models import *


class ContratoCabeceraForm(forms.ModelForm):
    class Meta:
        model = ContratoCabecera
        fields = ['ID_PROVEEDOR', 'ID_UNIDAD_NEGOCIO', 'ID_SOCIEDAD', 'ID_PAIS', 'ID_CLIENTE', 'ID_CONTACTO', 'ID_TIPO_CONTRATO', 'ID_REGION', 'COMENTARIO']


class InvoiceForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = "__all__"


class ApendiceCabecearForm(forms.ModelForm):
    class Meta:
        model = ApendiceCabecera
        fields = ['DES_APENDICE', 'ID_CONTRATO', 'ID_CONTACTO', 'ID_VENDEDOR', 'ID_ESTADO', 'FECHA_INICIO', 'FECHA_FIN', 'FECHA_FIN_OC_CLIENTE', 'COMENTARIO']


class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['ID_PAIS', 'ID_GRUPO_CLIENTE', 'ID_INDUSTRIA', 'FECHA_ALTA', 'CLAVE_FISCAL', 'NUM_CLIENTE_PLNG', 'NUM_CLIENTE_PROV', 'RAZON_SOCIAL', 'COMENTARIO']


class ContactoForm(forms.ModelForm):
    class Meta:
        model = Contacto
        fields = ['ID_CLIENTE', 'NOMBRE_CONTACTO', 'MAIL', 'TELEFONO', 'DOMICILIO', 'CP', 'CIUDAD', 'PROVINCIA', 'PAIS', 'PRIORIDAD']


class GrupoClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['ID_PAIS', 'ID_GRUPO_CLIENTE', 'ID_INDUSTRIA', 'FECHA_ALTA', 'CLAVE_FISCAL', 'NUM_CLIENTE_PLNG', 'NUM_CLIENTE_PROV', 'RAZON_SOCIAL', 'COMENTARIO']


class ProductoForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['ID_PAIS', 'ID_GRUPO_CLIENTE', 'ID_INDUSTRIA', 'FECHA_ALTA', 'CLAVE_FISCAL', 'NUM_CLIENTE_PLNG', 'NUM_CLIENTE_PROV', 'RAZON_SOCIAL', 'COMENTARIO']
