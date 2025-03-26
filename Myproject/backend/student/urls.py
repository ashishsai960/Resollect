from django.urls import path
from .views import (
    create_student, get_students, update_student, delete_student,
    filter_students, group_students
)

urlpatterns = [
    path('create/', create_student, name='create-student'),
    path('list/', get_students, name='get-students'),
    path('update/<int:student_id>/', update_student, name='update_student'),
    path('delete/<int:student_id>/', delete_student, name='delete_student'),
    path('filter/', filter_students, name='filter-students'),
    path('group/<str:group_by>/', group_students, name='group-students'),
]
