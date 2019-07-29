from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# from datetime import date
# from PIL import Image
# from django.urls import reverse
# from django.utils import timezone
# import os


class Estado(models.Model):
    ID_ESTADO = models.AutoField(max_length=11, primary_key=True, help_text="ID_ESTADO")
    COD_ESTADO = models.CharField(max_length=10, blank=True, null=True, help_text="COD_ESTADO")
    DES_ESTADO = models.CharField(max_length=50, blank=True, null=True, help_text="DES_ESTADO")

    class Meta:
        db_table = "estado"


class GrupoCliente(models.Model):
    ID_GRUPO_CLIENTE = models.AutoField(max_length=11, primary_key=True, help_text="ID_INDUSTRIA2")
    COD_GRUPO_CLIENTE = models.CharField(max_length=100, blank=True, null=True, help_text="COD_GRUPO_CLIENTE")
    DES_GRUPO_CLIENTE = models.CharField(max_length=100, blank=True, null=True, help_text="DES_GRUPO_CLIENTE")

    class Meta:
        db_table = "grupo_cliente"


class Pais(models.Model):
    ID_PAIS = models.AutoField(max_length=11, primary_key=True, help_text='ID of Pais')
    COD_PAIS = models.CharField(max_length=3, blank=True, null=True, help_text="Cod of pais")
    DES_PAIS = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = "pais"


class Industria(models.Model):
    ID_INDUSTRIA = models.AutoField(primary_key=True, max_length=11, unique=True)
    COD_INDUSTRIA = models.CharField(max_length=10, blank=True, null=True)
    DES_INDUSTRIA = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = "industria"


class Region(models.Model):
    ID_REGION = models.AutoField(max_length=11, primary_key=True, help_text='ID of Pais')
    COD_REGION = models.CharField(max_length=10, blank=True, null=True, help_text="Cod of pais")
    DES_REGION = models.CharField(max_length=100, blank=True, null=True, help_text="DES_REGION")

    class Meta:
        db_table = "region"


class Sociedad(models.Model):
    ID_SOCIEDAD = models.AutoField(max_length=11, primary_key=True, help_text='ID_SOCIEDAD')
    RAZON_SOCIAL = models.CharField(max_length=50, blank=True, null=True, help_text="RAZON_SOCIAL")
    CLAVE_FISCAL = models.CharField(max_length=50, blank=True, null=True, help_text="CLAVE_FISCAL")

    class Meta:
        db_table = "sociedad"


class TipoContrato(models.Model):
    ID_TIPO_CONTRATO = models.AutoField(max_length=11, primary_key=True, help_text='ID_TIPO_CONTRATO')
    COD_TIPO_CONTRATO = models.CharField(max_length=100, blank=True, null=True, help_text="COD_TIPO_CONTRATO")
    DES_TIPO_CONTRATO = models.CharField(max_length=100, blank=True, null=True, help_text="DES__TIPO_CONTRATO")

    class Meta:
        db_table = "tipo_contrato"


class TipoPosicion(models.Model):
    ID_TIPO_POSICION = models.AutoField(max_length=11, primary_key=True, help_text='ID_TIPO_POSICION')
    COD_TIPO_POSICION = models.CharField(max_length=50, blank=True, null=True, help_text="COD_TIPO_POSICION")
    DES_TIPO_POSICION = models.CharField(max_length=50, blank=True, null=True, help_text="DES_TIPO_POSICION")

    class Meta:
        db_table = "tipo_posicion"


class TipoProducto(models.Model):
    ID_TIPO_PRODUCTO = models.AutoField(max_length=11, primary_key=True, help_text='ID_TIPO_PRODUCTO')
    COD_TIPO_PRODUCTO = models.CharField(max_length=50, blank=True, null=True, help_text="COD_TIPO_PRODUCTO")
    DES_TIPO_PRODUCTO = models.CharField(max_length=50, blank=True, null=True, help_text="DES_TIPO_PRODUCTO")

    class Meta:
        db_table = "tipo_producto"


class UnidadNegocio(models.Model):
    ID_UNIDAD_NEGOCIO = models.AutoField(max_length=11, primary_key=True, help_text='ID_UNIDAD_NEGOCIO')
    COD_UNIDAD_NEGOCIO = models.CharField(max_length=50, blank=True, null=True, help_text="COD_UNIDAD_NEGOCIO")
    DES_UNIDAD_NEGOCIO = models.CharField(max_length=50, blank=True, null=True, help_text="DES_UNIDAD_NEGOCIO")

    class Meta:
        db_table = "unidad_negocio"


class Vendedor(models.Model):
    ID_VENDEDOR = models.AutoField(max_length=11, primary_key=True, help_text='ID_VENDEDOR')
    APELLIDO_VENEDOR = models.CharField(max_length=50, blank=True, null=True, help_text="APELLIDO_VENEDOR")
    NOMBRE_VENDEDOR = models.CharField(max_length=50, blank=True, null=True, help_text="NOMBRE_VENDEDOR")
    INICIALES_VENEDOR = models.CharField(max_length=3, blank=True, null=True, help_text="INICIALES_VENEDOR")

    class Meta:
        db_table = "vendedor"


class Cliente(models.Model):
    ID_CLIENTE = models.AutoField(primary_key=True, max_length=11, unique=True)
    ID_PAIS = models.ForeignKey(Pais, db_column="ID_PAIS", on_delete=models.CASCADE)
    ID_INDUSTRIA = models.ForeignKey(Industria, db_column="ID_INDUSTRIA", on_delete=models.CASCADE)
    ID_GRUPO_CLIENTE = models.ForeignKey(GrupoCliente, db_column="ID_GRUPO_CLIENTE", on_delete=models.CASCADE)
    FECHA_ALTA = models.DateTimeField(blank=True, null=True)
    NUM_CLIENTE_PROV = models.CharField(max_length=20, blank=True, null=True)
    NUM_CLIENTE_PLNG = models.CharField(max_length=20, blank=True, null=True)
    COMENTARIO = models.CharField(max_length=200, blank=True, null=True)
    RAZON_SOCIAL = models.CharField(max_length=50, blank=True, null=True)
    CLAVE_FISCAL = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = "cliente"


class Contacto(models.Model):
    ID_CONTACTO = models.AutoField(max_length=11, primary_key=True)
    ID_CLIENTE = models.ForeignKey(Cliente, db_column="ID_CLIENTE", on_delete=models.CASCADE)
    NOMBRE_CONTACTO = models.CharField(max_length=40, blank=True, null=False)
    MAIL = models.CharField(max_length=50, blank=True, null=False)
    TELEFONO = models.CharField(max_length=20, blank=True, null=False)
    DOMICILIO = models.CharField(max_length=100, blank=True, null=True)
    CP = models.CharField(max_length=20, blank=True, null=True)
    CIUDAD = models.CharField(max_length=30, blank=True, null=True)
    PROVINCIA = models.CharField(max_length=30, blank=True, null=True)
    PAIS = models.CharField(max_length=20, blank=True, null=True)
    PRIORIDAD = models.IntegerField(max_length=11, blank=True, null=True)

    class Meta:
        db_table = "contacto"


class Proveedor(models.Model):
    ID_PROVEEDOR = models.AutoField(max_length=11, primary_key=True, help_text="Id of Proveedor")
    ID_UNIDAD_NEGOCIO = models.ForeignKey(UnidadNegocio, db_column="ID_UNIDAD_NEGOCIO", on_delete=models.CASCADE)
    COD_PROVEEDOR = models.CharField(max_length=10, blank=True, null=True)
    DES_PROVEEDOR = models.CharField(max_length=100, blank=True, null=True)
    CLAVE_FISCAL = models.CharField(max_length=50, blank=True, null=True)
    RAZON_SOCIAL = models.CharField(max_length=50, blank=True, null=True)
    NOMBRE_FANTASIA = models.CharField(max_length=50, blank=True, null=True)
    DIRECCION = models.CharField(max_length=50, blank=True, null=True)
    PAIS = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = "proveedor"


class ContratoCabecera(models.Model):
    ID_CONTRATO = models.AutoField(max_length=15, primary_key=True, help_text="ID of Contrato")
    ID_PROVEEDOR = models.ForeignKey(Proveedor, db_column="ID_PROVEEDOR", on_delete=models.CASCADE)
    ID_UNIDAD_NEGOCIO = models.ForeignKey(UnidadNegocio, db_column="ID_UNIDAD_NEGOCIO", on_delete=models.CASCADE)
    ID_SOCIEDAD = models.ForeignKey(Sociedad, db_column="ID_SOCIEDAD", on_delete=models.CASCADE)
    ID_PAIS = models.ForeignKey(Pais, db_column="ID_PAIS", on_delete=models.CASCADE)
    ID_CLIENTE = models.ForeignKey(Cliente, db_column="ID_CLIENTE", on_delete=models.CASCADE)
    ID_CONTACTO = models.ForeignKey(Contacto, db_column="ID_CONTACTO", on_delete=models.CASCADE)
    ID_TIPO_CONTRATO = models.ForeignKey(TipoContrato, db_column="ID_TIPO_CONTRATO", on_delete=models.CASCADE)
    ID_REGION = models.ForeignKey(Region, db_column="ID_REGION", on_delete=models.CASCADE)
    FECHA_FIRMA = models.DateTimeField(blank=True, null=True)
    FECHA_INICIO = models.DateTimeField(blank=True, null=True)
    FECHA_FIN = models.DateTimeField(blank=True, null=True)
    FINALIZADO = models.BinaryField(blank=True, null=True)
    COMENTARIO = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        db_table = "contrato_cabecera"


class ApendiceCabecera(models.Model):
    ID_APENDICE = models.AutoField(max_length=11, primary_key=True)
    DES_APENDICE = models.CharField(max_length=100, blank=True, null=True)
    ID_CONTRATO = models.ForeignKey(ContratoCabecera, db_column="ID_CONTRATO", on_delete=models.CASCADE)
    ID_CONTACTO = models.ForeignKey(Contacto, db_column="ID_CONTACTO", on_delete=models.CASCADE)
    ID_VENDEDOR = models.ForeignKey(Vendedor, db_column="ID_VENDEDOR", on_delete=models.CASCADE)
    ID_ESTADO = models.ForeignKey(Estado, db_column="ID_ESTADO", on_delete=models.CASCADE)
    FECHA_INICIO = models.DateTimeField(blank=True, null=True)
    FECHA_FIN = models.DateTimeField(blank=True, null=True)
    FINALIZADO = models.BinaryField(blank=True, null=True)
    FECHA_FIN_OC_CLIENTE = models.DateTimeField(blank=True, null=True)
    COMENTARIO = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        db_table = "apendice_cabecera"


class Producto(models.Model):
    ID_PRODUCTO = models.AutoField(max_length=11, primary_key=True, help_text="Id of Producto")
    ID_TIPO_PRODUCTO = models.ForeignKey(TipoProducto, db_column="ID_TIPO_PRODUCTO", on_delete=models.CASCADE)
    COD_PRODUCTO = models.CharField(max_length=10, blank=True, null=False)
    DES_PRODUCTO = models.CharField(max_length=100, blank=True, null=False)
    METRICA = models.CharField(max_length=20, blank=True, null=True)
    BLOQUES = models.IntegerField(max_length=11, blank=True, null=True)
    MINIMO = models.IntegerField(max_length=11, blank=True, null=True)

    class Meta:
        db_table = "producto"


class DetalleApendice(models.Model):
    ID_APENDICE = models.ForeignKey(ApendiceCabecera, db_column="ID_APENDICE", on_delete=models.CASCADE)
    ID_POSICION = models.IntegerField(max_length=11, primary_key=False, null=False, blank=True, help_text="Id of Posicion")
    ID_PRODUCTO = models.ForeignKey(Producto, db_column="ID_PRODUCTO", on_delete=models.CASCADE)
    ID_TIPO_POSICION = models.ForeignKey(TipoProducto, db_column="ID_TIPO_POSICION", on_delete=models.CASCADE)
    CANTIDAD = models.IntegerField(max_length=11, blank=True, null=True, help_text="")
    VALOR_UNITARIO = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    TOTAL = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    PORCENTAJE_DTO_CLIENTE = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    VALOR_VENTA = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    PORCENTAJE_DTO_VENDOR = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COSTO_VENDOR = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    PORCENTAJE_COM_PARTNER = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COSTO_PARTNER = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COSTO_TOTAL = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    MARGEN = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COBRADA = models.BinaryField(blank=True, null=True)

    class Meta:
        db_table = "detalle_apendice"


class Po(models.Model):
    ID_PO = models.AutoField(max_length=11, primary_key=True, help_text="Id of Po")
    ID_CONTRATO = models.ForeignKey(ContratoCabecera, db_column="ID_CONTRATO", on_delete=models.CASCADE)
    ID_APENDICE = models.ForeignKey(ApendiceCabecera, db_column="ID_APENDICE", on_delete=models.CASCADE)
    ID_CLIENTE = models.ForeignKey(Cliente, db_column="ID_CLIENTE", on_delete=models.CASCADE)
    ID_CONTACTO = models.ForeignKey(Contacto, db_column="ID_CONTACTO", on_delete=models.CASCADE)
    FECHA_PO = models.DateTimeField(blank=True, null=True)
    MONTO_COSTO = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    MONTO_CLIENTE = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    MONTO_MARGEN = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COMENTARIO = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        db_table = "po"


class PoDetalle(models.Model):
    ID_POSICION = models.IntegerField(max_length=11, primary_key=True, help_text="Id of Posicion")
    ID_PO = models.ForeignKey(Po, db_column="ID_PO", on_delete=models.CASCADE)
    ID_TIPO_POSICION = models.ForeignKey(TipoPosicion, db_column="ID_TIPO_POSICION", on_delete=models.CASCADE)
    CANTIDAD = models.IntegerField(max_length=11, blank=True, null=True)
    VALOR_UNITARIO = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    TOTAL = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    PORCENTAJE_DTO_CLIENTE = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    VALOR_VENTA = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    PORCENTAJE_DTO_VENDOR = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COSTO_VENDOR = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    PORCENTAJE_COM_PARTNER = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COSTO_TOTAL = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    MARGEN = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)

    class Meta:
        db_table = "po_detalle"

class CuotaPo(models.Model):
    ID_PO = models.ForeignKey(Po, db_column="ID_PO", on_delete=models.CASCADE)
    ID_CUOTA = models.IntegerField(max_length=11, validators=[MinValueValidator(1), MaxValueValidator(12)], primary_key=True, help_text="Id of Couta")
    ID_CLIENTE = models.ForeignKey(Cliente, db_column="ID_CLIENTE", on_delete=models.CASCADE)
    FECHA_VENCIMIENTO = models.DateTimeField(blank=True, null=True)
    NRO_FACTURA = models.IntegerField(max_length=11, blank=True, null=True)
    SOCIEDAD = models.BinaryField(blank=True, null=True)
    FECHA_FACTURA = models.DateTimeField(blank=True, null=True)
    MONTO = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    COBRADA = models.BinaryField(blank=True, null=True)

    class Meta:
        db_table = "cuota_po"


class FacturaProveedor(models.Model):
    ID_PO = models.ForeignKey(Po, db_column="ID_PO", on_delete=models.CASCADE)
    # ID_CUOTA = models.IntegerField(max_length=11, primary_key=True, help_text="Id of Couta")
    ID_CUOTA = models.ForeignKey(CuotaPo, db_column="ID_CUOTA", on_delete=models.CASCADE)
    ID_PROVEEDOR = models.ForeignKey(Proveedor, db_column="ID_PROVEEDOR", on_delete=models.CASCADE)
    FECHA_OBJETIVO = models.DateTimeField(blank=True, null=True)
    FECHA_FACTURA = models.DateTimeField(blank=True, null=True)
    MONTO = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    NRO_FACTURA = models.IntegerField(max_length=11, blank=True, null=True, help_text="Id of Couta")
    PAGADA = models.BinaryField(blank=True, null=True)

    class Meta:
        db_table = "factura_proveedor"


class ContractsModel(models.Model):
    id = models.AutoField(max_length=11, primary_key=True, help_text="user Id")
    username = models.CharField(max_length=150, blank=True, null=False,unique=True, help_text="username")
    first_name = models.CharField(max_length=30, blank=True, null=False, help_text="first name")
    last_name = models.CharField(max_length=150, blank=True, null=False, help_text="last name")
    email = models.CharField(max_length=254, blank=True, null=False, help_text="email")
    is_superuser = models.SmallIntegerField(max_length=1, blank=True, null=True, help_text="check superuser")

    class Meta:
        db_table = "myauth"
