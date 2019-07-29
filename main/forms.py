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
