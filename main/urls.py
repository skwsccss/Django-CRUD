from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from main import views


urlpatterns = [
    # path('', InvoiceView.as_view(), name='invoice'),
    path('login/', auth_views.LoginView.as_view(template_name='main/login.html'), name='login'),
    path('login_request/', views.Login_request, name='login_request'),
    # path('', auth_views.LoginView.as_view(template_name='main/login.html'), name='login'),
    path('contracts', views.contracts),
    path('', views.invoice),
    path('invoice/', views.invoice),
    path('appendix', views.Appendix),
    path('cliente', views.cliente),
    path('contacto', views.contacto),
    path('grupo_cliente', views.grupocliente),
    path('producto', views.producto),
    path('logout/', views.Logout_request, name="logout"),
    path('changepwd/', views.Changepassword, name="changepwd"),
    path('getusername/', views.GetUserName, name="getusername"),
    
    path('create/', views.create, name="addnew"),
    path('readdata/<int:id>', views.readdata),
    path('update/<int:id>', views.update),
    path('delete/<int:id>', views.delete),

    

    # path('change/', views.change, name="change"),

]