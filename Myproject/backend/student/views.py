from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Student
from .serializers import StudentSerializer
from django.db.models import Count

@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Student created successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response({"students": serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT', 'PATCH'])
def update_student(request, student_id):  # student_id should be used in the URL
    try:
        student = Student.objects.get(id=student_id)  # Look up by 'id'
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

    # Allow partial updates using PATCH
    serializer = StudentSerializer(student, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Student updated successfully!", "data": serializer.data}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])  # Only allow DELETE method
def delete_student(request, student_id):  
    try:
        student = Student.objects.get(id=student_id)  # Fetch student by ID
        student.delete()  # Delete the student
        return Response({"message": "Student deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def filter_students(request):
    batch = request.GET.get('batch', None)
    grade = request.GET.get('grade', None)
    entry_number = request.GET.get('entry_number', None)

    students = Student.objects.all()
    if batch:
        students = students.filter(batch=batch)
    if grade:
        students = students.filter(grade=grade)
    if entry_number:
        students = students.filter(entry_number=entry_number)

    serializer = StudentSerializer(students, many=True)
    return Response({"filtered_students": serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def group_students(request, group_by):
    if group_by not in ['batch', 'grade']:
        return Response({"error": "Invalid group_by parameter. Use 'batch' or 'grade'."}, status=status.HTTP_400_BAD_REQUEST)

    grouped_students = Student.objects.values(group_by).annotate(count=Count(group_by))

    return Response({"grouped_data": list(grouped_students)}, status=status.HTTP_200_OK)
