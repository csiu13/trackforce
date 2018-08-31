package com.revature.test.services;

import static org.mockito.Mockito.when;

import org.hibernate.SessionFactory;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.revature.entity.TfAssociate;
import com.revature.services.AssociateService;
import com.revature.utils.HibernateUtil;

public class AssociateServicesTest {
	
	@InjectMocks
	private HibernateUtil hu;
	@Mock private SessionFactory sf;
	
	@Mock
	private AssociateService service;
	
	private TfAssociate associate1;
	
	@BeforeClass
	public void initialize() {
		service = new AssociateService();
		associate1 = new TfAssociate();
	}
	
	@Test
	public void testGetAssociate() {
		when(service.getCountUndeployedMapped()).thenReturn(null);
	}
}
