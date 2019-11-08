from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Max
import json
from datetime import date
from .models import Application,EduExp,WorkingExp,Recommander,ProfExp

# Create your views here.
def confirm_application(request):
    if request.method == "POST":
        apply_params = json.loads(request.body)
        print(apply_params)
        records = Application.objects.all()
        if records.count() != 0:
            max_sessionid = records.aggregate(Max('sessionid'))
            sessionid = max_sessionid['sessionid__max'] + 1
        else:
            sessionid = '00000001'
        # TODO 增加wechatid(openid)的追踪
        viptype = confirm_viptype(apply_params['request_paras']['viptype'])
        title = apply_params['request_paras']['parta']['title']
        applicant_cn_surname = apply_params['request_paras']['parta']['cn_surname']
        applicant_cn_name = apply_params['request_paras']['parta']['cn_name']
        applicant_en_first = apply_params['request_paras']['parta']['en_surname']
        applicant_en_name = apply_params['request_paras']['parta']['en_name']
        gender = apply_params['request_paras']['parta']['gender']
        hkid = apply_params['request_paras']['parta']['hkid']
        hkid_path = apply_params['request_paras']['parta']['hkid_path']
        email = apply_params['request_paras']['parta']['email']
        dob = date(apply_params['request_paras']['parta']["doby"],apply_params['request_paras']['parta']["dobm"],
                   apply_params['request_paras']['parta']["dobd"])
        phone = apply_params['request_paras']['parta']['phone']
        address = apply_params['request_paras']['parta']['district']+'-'+apply_params['request_paras']['parta']['street']+"-"+\
                  apply_params['request_paras']['parta']['building']+"-"+apply_params['request_paras']['parta']['door']
        edu_level = apply_params['request_paras']['partb']['first_edu_level']
        total_working_years = apply_params['request_paras']['partc']['working_range']
        application = Application(sessionid=sessionid,vip_type=viptype,title=title,cn_surname=applicant_cn_surname,
                                  cn_name=applicant_cn_name,en_first=applicant_en_first,en_other=applicant_en_name,
                                  gender=gender,hkid=hkid,email=email,phone=phone,dob=dob,address=address,hkid_path=hkid_path,
                                  edu_level=edu_level,total_working_years=total_working_years)
        application.save()
        #EduExp生成，加保存
        gen_edu_exps(apply_params,application)
        #ProfExp生成，加保存
        gen_prof_exps(apply_params,application)
        #WorkingExp生成，加保存
        gen_working_exp(apply_params,application)
        #Recommander生成，加保存
        gen_recommander_exp(apply_params,application)
        #TODO 返回sessionid
        return HttpResponse("Received.")
    else:
        return HttpResponse("Bad Request!")

def received_certificates():
    pass

def received_signature():
    pass

def gen_edu_exps(apply_params,application):
    first_edu_org = apply_params['request_paras']['partb']['first_edu_org']
    first_grad_date = date(apply_params['request_paras']['partb']['first_edu_year'],apply_params['request_paras']['partb']['first_edu_moh'],
                     apply_params['request_paras']['partb']['first_edu_day'])
    first_edu_prof = apply_params['request_paras']['partb']['first_edu_prof']
    second_edu_org = apply_params['request_paras']['partb']['first_edu_org']
    second_grad_date = date(apply_params['request_paras']['partb']['first_edu_year'],apply_params['request_paras']['partb']['first_edu_moh'],
                     apply_params['request_paras']['partb']['first_edu_day'])
    second_edu_prof = apply_params['request_paras']['partb']['first_edu_prof']
    edu_one = EduExp(edu_org=first_edu_org,grad_date=first_grad_date,edu_maj=first_edu_prof,application=application)
    edu_one.save()
    edu_two = EduExp(edu_org=second_edu_org,grad_date=second_grad_date,edu_maj=second_edu_prof,application=application)
    edu_two.save()

def gen_prof_exps(apply_params,application):
    first_prof_org = apply_params['request_paras']['partb']['first_prof_org']
    first_prof_name = apply_params['request_paras']['partb']['first_prof_name']
    first_prof_date = apply_params['request_paras']['partb']['first_prof_date']
    second_prof_org = apply_params['request_paras']['partb']['second_prof_org']
    second_prof_name = apply_params['request_paras']['partb']['second_prof_name']
    second_prof_date = apply_params['request_paras']['partb']['second_prof_date']
    # prof is not required
    if first_prof_org != "":
        prof_one = ProfExp(prof_org=first_prof_org,prof_name=first_prof_name,prof_date=first_prof_date,
                           application=application)
        prof_one.save()
    if second_prof_org != "":
        prof_two = ProfExp(prof_org=second_prof_org, prof_name=second_prof_name, prof_date=second_prof_date,
                           application=application)
        prof_two.save()


def gen_working_exp(apply_params,application):
    working_records = apply_params['request_paras']['partc']['records']
    for record in working_records:

    pass

def gen_recommander_exp(apply_params,application):

    pass

def confirm_viptype(viptypes):
    for viptype in viptypes:
        if viptype['selected']:
            return viptype['type']
        else:
            return "error"