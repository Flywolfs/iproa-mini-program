from django.db import models

# Create your models here.

class Application(models.Model):
    sessionid = models.IntegerField(max_length=8,primary_key=True)
    wechatid = models.CharField(max_length=128)
    vip_type = models.CharField(max_length=128)
    title = models.CharField(max_length=16)
    cn_surname = models.CharField(max_length=16)
    cn_name = models.CharField(max_length=32)
    en_first = models.CharField(max_length=32)
    en_other = models.CharField(max_length=64)
    gender = models.CharField(max_length=8)
    hkid = models.CharField(max_length=32)
    hkid_path = models.CharField(max_length=128)
    email = models.CharField(max_length=128)
    phone = models.CharField(max_length=320)
    dob = models.DateField()
    address = models.CharField(max_length=256)
    edu_level = models.CharField(max_length=32)
    total_working_years = models.CharField(max_length=32)
    signature_path = models.CharField(max_length=128)
    if_paid = models.BooleanField(default=False)

class EduExp(models.Model):
    edu_org = models.CharField(max_length=64)
    grad_date = models.DateField()
    edu_maj = models.CharField(max_length=64)
    maj_path = models.CharField(max_length=128)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

class ProfExp(models.Model):
    prof_org = models.CharField(max_length=64)
    prof_name = models.CharField(max_length=64)
    prof_date = models.DateField()
    prof_path = models.CharField(max_length=128)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

class WorkingExp(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    company = models.CharField(max_length=64)
    occupation = models.CharField(max_length=64)
    role = models.CharField(max_length=32)
    proof_path = models.CharField(max_length=128)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

class Recommander(models.Model):
    surname = models.CharField(max_length=32)
    othername = models.CharField(max_length=64)
    vipid = models.CharField(max_length=32)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

