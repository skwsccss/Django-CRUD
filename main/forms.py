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


class AppendixForm(forms.ModelForm):
    class Meta:
        model = Po
        fields = "__all__"
