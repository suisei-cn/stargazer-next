import json
import random


def is_bad_name_format(name):
    l = name['lang']
    return l.get('jp') is None and l.get('en') is None and l.get(
        'zh') is None and l.get('kr') is None


def map_name(name):
    lang = {}

    if jp := name.get('jp'):
        lang['jp'] = jp
    if en := name.get('en'):
        lang['en'] = en
    if zh := name.get('zh'):
        lang['zh'] = zh
    if kr := name.get('kr'):
        lang['kr'] = kr

    return {'lang': lang, "default": name.get('default')}


def main():
    with open(f'src/data/vdb.json', 'r', encoding='utf-8') as f:
        vdb = json.load(f)

    vtbs = [x for x in vdb['vtbs'] if x['type'] == 'vtuber']
    groups = [x for x in vdb['vtbs'] if x['type'] == 'group']

    new_vtbs = []
    new_groups = []

    for vtb in vtbs:
        new_name = map_name(vtb['name'])
        if is_bad_name_format(new_name):
            continue

        new = {
            'uuid': vtb['uuid'],
            'name': new_name,
            'subscribed': random.randint(0, 1) == 1,
        }

        if group := vtb.get('group'):
            new['group'] = group
        new_vtbs.append(new)

    for group in groups:
        new_name = map_name(group['name'])
        if is_bad_name_format(new_name):
            continue

        new_groups.append({
            'uuid': group['uuid'],
            'name': new_name,
        })

    count = random.randrange(50, 150)

    print(f"{count} vtbs")
    print(f"{len(new_groups)} groups")

    with open(f'src/data/vdb.new.json', 'w', encoding='utf-8') as f:
        json.dump(
            {
                'vtbs': random.sample(new_vtbs, k=count),
                'groups': new_groups
            },
            f,
            ensure_ascii=False,
        )


if __name__ == '__main__':
    main()
