from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Max
import json
from datetime import date
from .models import Application

# Create your views here.
def confirm_application(request):
    if request.method == "POST":
        apply_params = json.loads(request.body)
        records = Application.objects.all()
        if records.count() != 0:
            max_sessionid = records.aggregate(Max('sessionid'))
            sessionid = max_sessionid['sessionid__max'] + 1
        else:
            sessionid = '00000001'
        # TODO 增加wechatid(openid)的追踪
        viptype = confirm_viptype(apply_params['request_paras']['viptype'])
        title = apply_params['parta']['title']
        applicant_cn_surname = apply_params['parta']['cn_surname']
        applicant_cn_name = apply_params['parta']['cn_name']
        applicant_en_first = apply_params['parta']['en_surname']
        applicant_en_name = apply_params['parta']['en_name']
        gender = apply_params['parta']['gender']
        hkid = apply_params['parta']['hkid']
        hkid_path = apply_params['parta']['hkid_path']
        email = apply_params['parta']['email']
        dob = date(apply_params['parta']["doby"],apply_params['parta']["dobm"],apply_params['parta']["dobd"])
        phone = apply_params['parta']['phone']
        address = apply_params['parta']['district']+'-'+apply_params['parta']['street']+"-"+\
                  apply_params['parta']['building']+"-"+apply_params['parta']['door']
        edu_level = apply_params['partb']['first_edu_level']
        total_working_years = apply_params['partc']['working_range']
        application = Application(sessionid=sessionid,vip_type=viptype,title=title,cn_surname=applicant_cn_surname,
                                  cn_name=applicant_cn_name,en_first=applicant_en_first,en_other=applicant_en_name,
                                  gender=gender,hkid=hkid,email=email,phone=phone,dob=dob,address=address,hkid_path=hkid_path,
                                  edu_level=edu_level,total_working_years=total_working_years)
        application.save()

        #EduExp生成，加保存
        #ProfExp生成，加保存
        #WorkingExp生成，加保存
        #Recommander生成，加保存
        #TODO 返回sessionid
        return HttpResponse("Received.")
    else:
        return HttpResponse("Bad Request!")

def received_certificates():
    pass

def received_signature():
    pass

def gen_edu_exps(application):
    pass

def confirm_viptype(viptypes):
    for viptype in viptypes:
        if viptype['selected']:
            return viptype['type']
        else:
            return "error"