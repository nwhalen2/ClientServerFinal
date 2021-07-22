# test_api.py

import unittest
import requests
import json
from dorm_library import _dorm_database

class TestCherrypyPrimer(unittest.TestCase):

    SITE_URL = 'http://localhost:51027' #'http://student04.cse.nd.edu:510XX' 
    DORMS_URL = SITE_URL + '/dorms/'
    RESET_URL = SITE_URL + '/reset/'


    def reset_data(self):
        d = {}
        r = requests.put(self.RESET_URL, data = json.dumps(d))

    def is_json(self, resp):
        try:
            json.loads(resp)
            return True
        except ValueError:
            return False

    def test_get_dorms(self):
        self.reset_data()

        r = requests.get(self.DORMS_URL)
        self.assertTrue(self.is_json(r.content.decode()))
        resp = json.loads(r.content.decode())
        self.assertEqual(resp['result'], 'success')

        # create instance of dorm_library & load dictionary of dorm info
        ddb = _dorm_database()
        ddb.load_dorms('dorm.dat')

        # create temp dict to hold "dorm_info"
        temp_data = ddb.get_dorms()
        dorm = dict()

        # test that all dorm information from get_dorms() 
        # is equal to resp, which the server outputs 
        for i in temp_data.keys():
            dorm['name'] = temp_data[i][0]
            dorm['year'] = temp_data[i][1]
            dorm['gender'] = temp_data[i][2]
            dorm['quad'] = temp_data[i][3]
            dorm['mascot'] = temp_data[i][4]
            i = str(i)
            self.assertEqual(resp[i], dorm)

    def test_get_dorm(self):
        self.reset_data()

        d_id = 19

        r = requests.get(self.DORMS_URL + str(d_id) + '/')
        self.assertTrue(self.is_json(r.content.decode()))
        resp = json.loads(r.content.decode())
        self.assertEqual(resp['result'], 'success')

        # create instance of dorm_library & load dictionary of dorm info
        ddb = _dorm_database()
        ddb.load_dorms('dorm.dat')

        # store information on dorm with id = 19, or Lyons Hall
        temp_data = ddb.get_dorm(d_id)

        # create dictionary with specific dorm information
        dorm = dict()
        dorm['result'] = 'success'
        dorm['name'] = temp_data[0]
        dorm['year'] = temp_data[1]
        dorm['gender'] = temp_data[2]
        dorm['quad'] = temp_data[3]
        dorm['mascot'] = temp_data[4]

        # test that info from get_dorm is equal to resp, the server's output
        self.assertEqual(resp, dorm)


        
    def test_set_dorm(self):
        self.reset_data()

        d_id = 34

        # show that dorm with id = 34 does not exist yet
        r = requests.get(self.DORMS_URL + str(d_id) + '/')
        self.assertTrue(self.is_json(r.content.decode()))
        resp = json.loads(r.content.decode())
        self.assertEqual(resp['result'], 'error')

        # create instance of dorm_library & load dictionary of dorm info
        ddb = _dorm_database()
        ddb.load_dorms('dorm.dat')

        # create new dorm & add to server with set_dorm
        dorm = ['Sorin Community in Zahm', 2021, 'Male', 'North', 'The Resurrected']
        ddb.set_dorm(34, dorm)

        d_test = dict()
        d_test['result'] = 'success'
        d_test['name'] = ddb.dorm_info[34][0]
        d_test['year'] = ddb.dorm_info[34][1]
        d_test['gender'] = ddb.dorm_info[34][2]
        d_test['quad'] = ddb.dorm_info[34][3]
        d_test['mascot'] = ddb.dorm_info[34][4]

        # create same new dorm, but this time with a request
        d_id = 34
        d = {}
        d['name'] = 'Sorin Community in Zahm'
        d['year'] = 2021
        d['gender'] = 'Male'
        d['quad'] = 'North'
        d['mascot'] = 'The Resurrected'

        r = requests.put(self.DORMS_URL + str(d_id) + '/', data = json.dumps(d))
        self.assertTrue(self.is_json(r.content.decode()))
        resp = json.loads(r.content.decode())
        self.assertEqual(resp['result'], 'success')

        r = requests.get(self.DORMS_URL + str(d_id) + '/')
        self.assertTrue(self.is_json(r.content.decode()))
        resp = json.loads(r.content.decode())
        self.assertEqual(resp['result'], 'success')

        # confirm that data added by both methods is equal
        self.assertEqual(resp, d_test)

        

    def test_delete_dorm(self):

        self.reset_data()

        d_id = 33

        # create instance of dorm_library & load dictionary of dorm info
        ddb = _dorm_database()
        ddb.load_dorms('dorm.dat')

        # show that dorm with id = 33 exists
        dorm = ddb.get_dorm(d_id)
        self.assertTrue(dorm)

        # show that dorm with id = 33 exists with a request
        r = requests.get(self.DORMS_URL + str(d_id) + '/')
        self.assertTrue(self.is_json(r.content.decode()))
        resp = json.loads(r.content.decode())
        self.assertEqual(resp['result'], 'success')

        # confirm that these two are equal
        d = {}
        d['result'] = 'success'
        d['name'] = dorm[0]
        d['year'] = dorm[1]
        d['gender'] = dorm[2]
        d['quad'] = dorm[3]
        d['mascot'] = dorm[4]
        self.assertEqual(resp, d)

        # now delete dorm with id = 19 
        ddb.delete_dorm(d_id)
        # & confirm that it is gone 
        dorm = ddb.get_dorm(d_id)
        self.assertFalse(dorm)


if __name__ == "__main__":
        unittest.main()