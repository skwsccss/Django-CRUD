from django import forms
from main.models import *


class ContractsForm(forms.ModelForm):
    class Meta:
        model = ContractsModel
        fields = ['username', 'first_name', 'last_name', 'email', 'is_superuser']


class InvoiceForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = "__all__"


class AppendixForm(forms.ModelForm):
    class Meta:
        model = Po
        fields = "__all__"
