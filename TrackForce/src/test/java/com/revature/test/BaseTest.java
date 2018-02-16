package com.revature.test;

import java.io.IOException;
import java.sql.SQLException;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.revature.dao.AssociateDaoHibernate;
import com.revature.dao.BatchDaoHibernate;
import com.revature.dao.ClientDaoImpl;
import com.revature.dao.CurriculumDaoImpl;
import com.revature.dao.MarketingStatusDaoHibernate;
import com.revature.dao.TechDaoHibernate;
import com.revature.utils.PersistentStorage;
import com.revature.utils.TestHibernateUtil;

public class BaseTest {
    protected SessionFactory sessionFactory;

    public BaseTest() {
        try {
            sessionFactory = TestHibernateUtil.getSessionFactory();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void rollbackAndClose(Session session) {
        try {
            session.getTransaction().rollback();
        } catch (Exception ignored) {
        }

        try {
            session.close();
        } catch (Exception ignored) {
        }
    }

    public void resetCaches() {
    	PersistentStorage.getStorage().evictAssociates();
    	PersistentStorage.getStorage().evictBatches();
    	PersistentStorage.getStorage().evictClients();
    	PersistentStorage.getStorage().evictCurriculums();
    	PersistentStorage.getStorage().evictMarketingStatuses();
    	PersistentStorage.getStorage().evictTechs();
    	new AssociateDaoHibernate().cacheAllAssociates();
    	new BatchDaoHibernate().cacheAllBatches();
    	new ClientDaoImpl().cacheAllClients();
    	new CurriculumDaoImpl().cacheAllCurriculms();
    	new MarketingStatusDaoHibernate().cacheAllMarketingStatuses();
    	new TechDaoHibernate().cacheAllTechs();
    }


    /**
     * TODO: add a reset method in Delegator interface (or to the daos),
     * so that each type of resource can reset its part of the cache
     *
     * allows using of injected services to reset the cache
     *
     * @param mockAssocService
     * @param mockClientResource
     * @param mockMsService
     * @throws IOException
     */
    public void resetCaches(AssociateDaoHibernate mockAssocService, ClientDaoImpl mockClientResource, MarketingStatusDaoHibernate mockMsService) throws IOException {
        if (mockAssocService == null)
            mockAssocService = new AssociateDaoHibernate();
        if (mockClientResource == null)
            mockClientResource = new ClientDaoImpl();
        if (mockMsService == null)
            mockMsService = new MarketingStatusDaoHibernate();

        //PersistentStorage.getStorage().setAssociates(mockAssocService.getAssociates());
        //PersistentStorage.getStorage().setClients(mockClientResource.getClients());
        //PersistentStorage.getStorage().setMarketingStatuses(mockMsService.getMarketingStatus());
    }
}
