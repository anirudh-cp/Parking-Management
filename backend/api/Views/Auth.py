from api.models import user
from api.serializers import RegistrationUserSerializer, userSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status

from rest_framework.authtoken.models import Token

import sys


sys.path.append('../..')


@api_view(['POST', ])
@authentication_classes([TokenAuthentication])
def registration_view(request):
    if request.method == 'POST':
        data = {}

        email = request.data.get('email', '0').lower()

        if validate_email(email) != None:
            data['response'] = 'That email is already in use.'
            return Response(data, status=status.HTTP_409_CONFLICT)

        serializer = RegistrationUserSerializer(data=request.data)

        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'Successfully registered new user.'
            data['email'] = account.email
            data['uuid'] = account.uuid
            token = Token.objects.get(user=account).key
            data['token'] = token          
        else:
            data = serializer.errors
        return Response(data, status=status.HTTP_201_CREATED)


def validate_email(email):
    try:
        accountObj = user.objects.get(email=email)
    except user.DoesNotExist:
        return None

    if accountObj != None:
        return email


class ObtainAuthTokenView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        context = {}

        email = request.data.get('email')
        password = request.data.get('password')

        # If user existence and auth credentials,  return JWT
        # If user existence and bad credentials, return None, increment passWrongCount
        # Else return None.

        userObj = user.objects.filter(email=email)

        if userObj:
            userObj = userObj[0]
            account = authenticate(email=email, password=password)
            if account:
                try:
                    token = Token.objects.get(user=account)
                except Token.DoesNotExist:
                    token = Token.objects.create(user=account)
                context['response'] = 'Successfully authenticated.'
                context['email'] = account.email
                context['uuid'] = account.uuid
                context['token'] = token.key
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {'response': 'Bad credentials'}
                return Response(context, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # FIXME: Secuity vulnerablity, can check if account exists because of message
            context = {'response': 'User does not exist'}
            return Response(context, status=status.HTTP_404_NOT_FOUND)

