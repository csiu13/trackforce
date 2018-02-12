package com.revature.entity;
// Generated Nov 7, 2017 9:24:46 PM by Hibernate Tools 5.2.5.Final

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * TfRole generated by hbm2java
 */
@Entity
@Table(name = "TF_ROLE", schema = "ADMIN")
public class TfRole implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2827764589977541041L;
	private Integer tfRoleId;
	private String tfRoleName;
	private Set<TfUser> tfUsers = new HashSet<TfUser>(0);

	public TfRole() {
	}

	public TfRole(Integer tfRoleId) {
		this.tfRoleId = tfRoleId;
	}

	public TfRole(Integer tfRoleId, String tfRoleName, Set<TfUser> tfUsers) {
		this.tfRoleId = tfRoleId;
		this.tfRoleName = tfRoleName;
		this.tfUsers = tfUsers;
	}

	@Id

	@Column(name = "TF_ROLE_ID", unique = true, nullable = false, precision = 22, scale = 0)
	public Integer getTfRoleId() {
		return this.tfRoleId;
	}

	public void setTfRoleId(Integer tfRoleId) {
		this.tfRoleId = tfRoleId;
	}

	@Column(name = "TF_ROLE_NAME", length = 20)
	public String getTfRoleName() {
		return this.tfRoleName;
	}

	public void setTfRoleName(String tfRoleName) {
		this.tfRoleName = tfRoleName;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "tfRole")
	public Set<TfUser> getTfUsers() {
		return this.tfUsers;
	}

	public void setTfUsers(Set<TfUser> tfUsers) {
		this.tfUsers = tfUsers;
	}

}
