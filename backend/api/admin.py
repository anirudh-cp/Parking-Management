from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class user_admin(UserAdmin):
    list_display = ('email',  'passWrongCount', 'date_joined', 'last_login',)
    search_fields = ('email',)
    readonly_fields=('date_joined', 'last_login')
    ordering = ('email', )
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2'),
    }),
)


admin.site.register(user, user_admin)

admin.site.register(driver)
admin.site.register(slot)
admin.site.register(booking)
