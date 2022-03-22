#! python3
# -*- coding: utf-8 -*-

'''
拆分&组装文章
'''

import re


def split(text: str):
    lines = re.split('(\n+)', text)

    part_list = [part_split(line) for line in lines]
    content_list = [part['content'] for part in part_list]

    content_dict = {i: content_list[i] for i in range(
        0, len(content_list)) if content_list[i]}

    return {
        'parts': part_list,
        'content': content_dict
    }


def part_split(line: str):
    _, prefix, other = re.split('^(\W*)', line)
    content, suffix,  = re.split('(\W*)$', other)[:2]

    return {
        'prefix': prefix,
        'content': content,
        'suffix': suffix,
    }


def concat(parts, content):

    def join(i):
        part_content = content[str(i)] if str(i) in content else ''
        return parts[i]['prefix'] + part_content + parts[i]['suffix']

    lines = [join(i) for i in range(0, len(parts))]
    text = ''.join(lines)
    return text
