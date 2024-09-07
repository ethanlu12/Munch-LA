# Generated by Django 4.2.15 on 2024-09-04 02:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('munch', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-id'], 'verbose_name': 'Chat Message', 'verbose_name_plural': 'Chat Messages'},
        ),
        migrations.AddField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, help_text='The time when the message was created'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.TextField(help_text='The text content of the message.'),
        ),
        migrations.AlterField(
            model_name='message',
            name='message_type',
            field=models.CharField(help_text='Indicates whether the message is from a human or AI.', max_length=10),
        ),
        migrations.AlterField(
            model_name='message',
            name='session_id',
            field=models.CharField(help_text='Unique identifier for the chat session.', max_length=100),
        ),
    ]
