package com.revature.test.utils;

import static org.junit.Assert.assertEquals;
import static org.testng.Assert.assertNotNull;
import static org.testng.AssertJUnit.assertFalse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.TreeSet;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.revature.dao.AssociateDaoHibernate;
import com.revature.dao.BatchDaoHibernate;
import com.revature.dao.ClientDaoImpl;
import com.revature.dao.CurriculumDaoImpl;
import com.revature.dao.MarketingStatusDaoHibernate;
import com.revature.model.AssociateInfo;
import com.revature.model.BatchInfo;
import com.revature.model.ClientInfo;
import com.revature.model.CurriculumInfo;
import com.revature.model.MarketingStatusInfo;
import com.revature.services.AssociateService;
import com.revature.test.BaseTest;
import com.revature.utils.PersistentStorage;

public class PersistentStorageTest extends BaseTest {

    @Mock
    private AssociateDaoHibernate mockAssociateDao;
    @Mock
    private BatchDaoHibernate mockBatchDao;
    @Mock
    private ClientDaoImpl mockClientDao;
    @Mock
    private CurriculumDaoImpl mockCurriculumDao;
    @Mock
    private MarketingStatusDaoHibernate mockMarketingStatusDao;

    @BeforeTest
    public void beforeTests() throws IOException, SQLException {
        MockitoAnnotations.initMocks(this);

        HashMap<Integer, AssociateInfo> associateMap = new HashMap<>();
        AssociateInfo aInfo = new AssociateInfo();
        aInfo.setId(new Integer(-1));
        associateMap.put(new Integer(-1), aInfo);

        BatchInfo bInfo = new BatchInfo();
        bInfo.setId(new Integer(-1));
        HashMap<Integer, BatchInfo> batchMap = new HashMap<>();
        batchMap.put(new Integer(-1), bInfo);

        ClientInfo cInfo = new ClientInfo();
        cInfo.setId(new Integer(-1));
        HashMap<Integer, ClientInfo> clientMap = new HashMap<>();
        clientMap.put(new Integer(-1), cInfo);

        CurriculumInfo currInfo = new CurriculumInfo();
        currInfo.setId(new Integer(-1));
        HashMap<Integer, CurriculumInfo> curriculumMap = new HashMap<>();
        curriculumMap.put(new Integer(-1), currInfo);

        MarketingStatusInfo mInfo = new MarketingStatusInfo();
        mInfo.setId(new Integer(-1));
        HashMap<Integer, MarketingStatusInfo> marketingStatusMap = new HashMap<>();
        marketingStatusMap.put(new Integer(-1), mInfo);

        Mockito.when(mockAssociateDao.getAssociates())
                .thenReturn(associateMap);
        Mockito.when(mockBatchDao.getBatchDetails())
                .thenReturn(batchMap);
        Mockito.when(mockClientDao.getAllTfClients())
                .thenReturn(clientMap);
        Mockito.when(mockCurriculumDao.getAllCurriculums())
                .thenReturn(curriculumMap);
        Mockito.when(mockMarketingStatusDao.getMarketingStatus())
                .thenReturn(marketingStatusMap);

//        PersistentServiceDelegator serviceDelegator = new PersistentServiceDelegator(
//                new AssociateService(),
//                new BatchesService(),
//                new ClientService(),
//                new CurriculumService(),
//                new MarketingStatusService()
//        );

//        PersistentServiceDelegator serviceDelegator = new PersistentServiceDelegator();
        
        // pull info from *database (*results mocked in this case)
        	mockAssociateDao.cacheAllAssociates();
        	mockBatchDao.cacheAllBatches();
        	mockClientDao.cacheAllClients();
        	mockCurriculumDao.cacheAllCurriculms();
        	mockMarketingStatusDao.cacheAllMarketingStatuses();
        
//        serviceDelegator.getAssociates();
//        serviceDelegator.getBatches();
//        serviceDelegator.getClients();
//        serviceDelegator.getCurriculums();
//        serviceDelegator.getMarketingStatuses();
    }

    @Test
    public void testActualPersistence() {
        assertNotNull(PersistentStorage.getStorage().getAssociates());
        assertFalse(PersistentStorage.getStorage().getAssociates().isEmpty());
        assertNotNull(PersistentStorage.getStorage().getBatches());
        assertFalse(PersistentStorage.getStorage().getBatches().isEmpty());
        assertNotNull(PersistentStorage.getStorage().getClients());
        assertFalse(PersistentStorage.getStorage().getClients().isEmpty());
        assertNotNull(PersistentStorage.getStorage().getCurriculums());
        assertFalse(PersistentStorage.getStorage().getCurriculums().isEmpty());
        assertNotNull(PersistentStorage.getStorage().getMarketingStatuses());
        assertFalse(PersistentStorage.getStorage().getMarketingStatuses().isEmpty());
        assertNotNull(PersistentStorage.getStorage().getTechs().isEmpty());
        assertFalse(PersistentStorage.getStorage().getTechs().isEmpty());
    }

    @Test
    public void updateAssociate() throws NumberFormatException, IOException {
        System.err.println(PersistentStorage.getStorage().getAssociateAsMap());
        
		TreeSet<AssociateInfo> aiSet = (TreeSet<AssociateInfo>) PersistentStorage.getStorage().getAssociates();
		AssociateInfo ai = aiSet.first();
		AssociateInfo copy = new AssociateInfo();

		// We need an associate with different info to test against
		Assert.assertNotEquals(2, ai.getMsid());
		Assert.assertNotEquals(1, ai.getClid());

		copy.setBid(ai.getBid());
		copy.setClid(ai.getClid());
		copy.setCurid(ai.getCurid());
		copy.setMarketingStatusId(ai.getMsid());
		copy.setEcid(ai.getEcid());

		AssociateService as = new AssociateService();
		List<Integer> associateIds = new ArrayList<>(new Integer(1));
		as.updateAssociates(associateIds , 2, 2);

		assertEquals(2, ai.getMsid());
		Assert.assertEquals(1, ai.getClid());
    }
}
