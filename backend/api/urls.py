from django.urls import path

from .Views.Auth import *
from .Views.Users import *
from .Views.Driver import *
from .Views.Book import *
from .Views.Slots import *


urlpatterns = [
 
    path('driver/add', DriverAdd.as_view()),
    path('book', BookActions.as_view()),
    path('book/<int:code>', BookDelete.as_view()),
    path('slot', SlotPreBook.as_view()),
    
    path('user/login', ObtainAuthTokenView.as_view()),
    path('slots/<int:num>', SlotActions.as_view()),
    path('slots', SlotGet.as_view()),
    
    path('user/register', registration_view),      
    path('user/<uuid:uuid>', UserActions.as_view()),
    path('user', UserAll.as_view()),
 
]

