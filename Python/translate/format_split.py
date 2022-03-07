#! python3
# -*- encoding: utf8 -*-

'''
分割文本，生成内容和模版json
'''


import json
from format import split


name = 'python'

text = '''
Python is a programming language that lets you work quickly and integrate systems more effectively.
'''

split_dict = split(text)


scheme_file = open('./scheme_' + name + '.json', 'w+', encoding='utf8')
scheme_file.seek(0)
scheme_file.write(json.dumps(
    split_dict['parts'], indent=4, ensure_ascii=False))
scheme_file.truncate()
scheme_file.close()

content_file = open('./content_' + name + '.json', 'w+', encoding='utf8')
content_file.seek(0)
content_file.write(json.dumps(
    split_dict['content'], indent=4, ensure_ascii=False))
content_file.truncate()
content_file.close()
