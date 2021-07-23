import unittest
import requests
import json

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

        def test_dorm_get(self):
                self.reset_data()

                d_id = 11
                r = requests.get(self.DORMS_URL + str(d_id) + '/') 
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())

                # confirm that data from server matches with what's expected of id = 11
                self.assertEqual(resp['name'], 'Fisher')
                self.assertEqual(resp['year'], 1952)
                self.assertEqual(resp['gender'], 'Male')
                self.assertEqual(resp['quad'], 'South')
                self.assertEqual(resp['mascot'], 'Fishermen')

                d_id = 12
                r = requests.get(self.DORMS_URL + str(d_id) + '/') 
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
                
                # confirm that data from server matches with what's expected of id = 12
                self.assertEqual(resp['name'], 'Flaherty')
                self.assertEqual(resp['year'], 2016)
                self.assertEqual(resp['gender'], 'Female')
                self.assertEqual(resp['quad'], 'Mod')
                self.assertEqual(resp['mascot'], 'Bears')

        def test_dorm_delete(self):
                self.reset_data()

                d_id = 1 # identifies first dorm (alumni)

                # delete data
                d = {}
                r = requests.delete(self.DORMS_URL + str(d_id) + '/', data = json.dumps(d))
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))
                self.assertEqual(resp['result'], 'success')

                # attempt to locate deleted data
                r = requests.get(self.DORMS_URL + str(d_id) + '/') 
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))
                self.assertEqual(resp['result'], 'error')

                # all other data should load successfully
                r = requests.get(self.DORMS_URL) # all other data should load successfully
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))
                self.assertEqual(resp['result'], 'success')

        def test_dorm_put(self):
                self.reset_data()
                r = requests.get(self.DORMS_URL)

                d_id = 33

                r = requests.get(self.DORMS_URL + str(d_id) + '/') # confirm get key 
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))

                # make sure that all info from server is what's expected of id = 33
                self.assertEqual(resp['name'], 'Zahm')
                self.assertEqual(resp['year'], 1937)
                self.assertEqual(resp['gender'], 'Male')
                self.assertEqual(resp['quad'], 'North')
                self.assertEqual(resp['mascot'], 'Zahmbies')

                # create new dorm
                d = {}
                d['name'] = 'Sorin Community in Zahm'
                d['year'] = 2021
                d['gender'] = 'Male'
                d['quad'] = 'North'
                d['mascot'] = 'The Resurrected'

                # replace zahm with sorin community in zahm :(
                r = requests.put(self.DORMS_URL + str(d_id) + '/', data = json.dumps(d))
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))

                r = requests.get(self.DORMS_URL + str(d_id) + '/')
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))

                # confirm that new information has replaced old
                self.assertEqual(resp['name'], 'Sorin Community in Zahm')
                self.assertEqual(resp['year'], 2021)
                self.assertEqual(resp['gender'], 'Male')
                self.assertEqual(resp['quad'], 'North')
                self.assertEqual(resp['mascot'], 'The Resurrected')

                # create new dorm 
                new_id = 34
                d = {}
                d['name'] = 'McKenna'
                d['year'] = 2021
                d['gender'] = 'Male'
                d['quad'] = 'East'
                d['mascot'] = 'Eagles'
                
                # add dorm with request
                r = requests.put(self.DORMS_URL + str(new_id) + '/', data = json.dumps(d))
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))

                # retrieve new dorm info from server
                r = requests.get(self.DORMS_URL + str(new_id) + '/')
                self.assertTrue(self.is_json(r.content.decode('utf-8')))
                resp = json.loads(r.content.decode('utf-8'))

                # make sure dorm info is what's expected from new input
                self.assertEqual(resp['name'], 'McKenna')
                self.assertEqual(resp['year'], 2021)
                self.assertEqual(resp['gender'], 'Male')
                self.assertEqual(resp['quad'], 'East')
                self.assertEqual(resp['mascot'], 'Eagles')

        def test_index_get(self):
                self.reset_data()
                
                r = requests.get(self.DORMS_URL)
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
                self.assertEqual(resp['result'], 'success')

                count = 0
                for key in resp:
                        if key == '19':
                                dorm = resp[key]
                        count += 1
                # make sure that loop ran through all 33 dorms (plus result)
                self.assertEqual(count, 34)

                # confirm that dorm info fetched from server
                # is what's expected from id = 19
                self.assertEqual(dorm['name'], 'Lyons')
                self.assertEqual(dorm['year'], 1927)
                self.assertEqual(dorm['gender'], 'Female')
                self.assertEqual(dorm['quad'], 'South')
                self.assertEqual(dorm['mascot'], 'Lion')

        def test_index_delete(self):
                self.reset_data()
                
                d_id = 12
                d = {}

                r = requests.get(self.DORMS_URL) # get before delete
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())

                r = requests.delete(self.DORMS_URL, data = json.dumps(d)) # deletes all data
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
                self.assertEqual(resp['result'], 'success')

                r = requests.delete(self.DORMS_URL + str(d_id) + '/') # attempt to delete already deleted key
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
                self.assertEqual(resp['result'], 'error')

                r = requests.get(self.DORMS_URL + str(d_id) + '/') # attempt to get deleted key
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
                self.assertEqual(resp['result'], 'error')

                self.reset_data()


        def test_index_post(self):
                self.reset_data()

                # create new dorm
                d = {}
                d['name'] = 'McKenna'
                d['year'] = 2021
                d['gender'] = 'Male'
                d['quad'] = 'East'
                d['mascot'] = 'Eagles'

                # add dorm to server
                r = requests.post(self.DORMS_URL, data = json.dumps(d))
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
                self.assertEqual(resp['result'], 'success')
                self.assertEqual(resp['id'], 34)

                # get new dorm from server
                r = requests.get(self.DORMS_URL + str(resp['id']) + '/')
                self.assertTrue(self.is_json(r.content.decode()))
                resp = json.loads(r.content.decode())
            
                # confirm that added dorm has same info as was posted
                self.assertEqual(resp['name'], d['name'])
                self.assertEqual(resp['year'], 2021)
                self.assertEqual(resp['gender'], 'Male')
                self.assertEqual(resp['quad'], 'East')
                self.assertEqual(resp['mascot'], d['mascot'])

if __name__ == "__main__":
        unittest.main()
