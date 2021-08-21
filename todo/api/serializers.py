from rest_framework import serializers

from todo_list.models import Task #, FilterActive


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


# class FilterTaskListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FilterActive
#         fields = '__all__'



# class FilterTaskListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FilterActive
#         fields = '__all__'

