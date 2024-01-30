from django import template
import datetime
from main.consts import CONTACT_ICONS

register = template.Library()

@register.filter
def getIcon(value):
    return CONTACT_ICONS.get(value)


@register.filter
def split(value):
    items = []
    for i in str(value).split("\n"):
        i = str(i).strip()
        if i:
            i = i.replace('*', '')
            items.append(i)

    return items



@register.filter
def duration(start, end):

    print(start, end)
    
    from_date = datetime.datetime(2019, 10, 21)
    to_date   = datetime.datetime(2019, 10, 25)

    result = to_date - from_date
    print(result.days)
