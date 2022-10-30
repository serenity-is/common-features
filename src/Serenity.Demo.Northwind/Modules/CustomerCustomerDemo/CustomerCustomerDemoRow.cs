using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace Serenity.Demo.Northwind
{
    [ConnectionKey("Northwind"), Module("Northwind"), TableName("CustomerCustomerDemo")]
    [DisplayName("CustomerCustomerDemo"), InstanceName("CustomerCustomerDemo")]
    [ReadPermission(PermissionKeys.General)]
    [ModifyPermission(PermissionKeys.General)]
    public sealed class CustomerCustomerDemoRow : Row<CustomerCustomerDemoRow.RowFields>, IIdRow, INameRow
    {
        [DisplayName("Id"), Identity, IdProperty]
        public int? ID
        {
            get => fields.ID[this];
            set => fields.ID[this] = value;
        }

        [DisplayName("Customer Id"), Size(5), PrimaryKey, ForeignKey("Customers", "CustomerID"), LeftJoin("jCustomer"), QuickSearch, NameProperty]
        public string CustomerID
        {
            get => fields.CustomerID[this];
            set => fields.CustomerID[this] = value;
        }

        [DisplayName("Customer Type Id"), Size(10), PrimaryKey, ForeignKey("CustomerDemographics", "CustomerTypeID"), LeftJoin("jCustomerType")]
        public string CustomerTypeID
        {
            get => fields.CustomerTypeID[this];
            set => fields.CustomerTypeID[this] = value;
        }

        [DisplayName("Customer Company Name"), Expression("jCustomer.[CompanyName")]
        public string CustomerCompanyName
        {
            get => fields.CustomerCompanyName[this];
            set => fields.CustomerCompanyName[this] = value;
        }

        [DisplayName("Customer Contact Name"), Expression("jCustomer.[ContactName]")]
        public string CustomerContactName
        {
            get => fields.CustomerContactName[this];
            set => fields.CustomerContactName[this] = value;
        }

        [DisplayName("Customer Contact Title"), Expression("jCustomer.[ContactTitle]")]
        public string CustomerContactTitle
        {
            get => fields.CustomerContactTitle[this];
            set => fields.CustomerContactTitle[this] = value;
        }

        [DisplayName("Customer Address"), Expression("jCustomer.[Address]")]
        public string CustomerAddress
        {
            get => fields.CustomerAddress[this];
            set => fields.CustomerAddress[this] = value;
        }

        [DisplayName("Customer City"), Expression("jCustomer.[City]")]
        public string CustomerCity
        {
            get => fields.CustomerCity[this];
            set => fields.CustomerCity[this] = value;
        }

        [DisplayName("Customer Region"), Expression("jCustomer.[Region]")]
        public string CustomerRegion
        {
            get => fields.CustomerRegion[this];
            set => fields.CustomerRegion[this] = value;
        }

        [DisplayName("Customer Postal Code"), Expression("jCustomer.[PostalCode]")]
        public string CustomerPostalCode
        {
            get => fields.CustomerPostalCode[this];
            set => fields.CustomerPostalCode[this] = value;
        }

        [DisplayName("Customer Country"), Expression("jCustomer.[Country]")]
        public string CustomerCountry
        {
            get => fields.CustomerCountry[this];
            set => fields.CustomerCountry[this] = value;
        }

        [DisplayName("Customer Phone"), Expression("jCustomer.[Phone]")]
        public string CustomerPhone
        {
            get => fields.CustomerPhone[this];
            set => fields.CustomerPhone[this] = value;
        }

        [DisplayName("Customer Fax"), Expression("jCustomer.[Fax]")]
        public string CustomerFax
        {
            get => fields.CustomerFax[this];
            set => fields.CustomerFax[this] = value;
        }

        [DisplayName("Customer Type Customer Desc"), Expression("jCustomerType.[CustomerDesc]")]
        public string CustomerTypeCustomerDesc
        {
            get => fields.CustomerTypeCustomerDesc[this];
            set => fields.CustomerTypeCustomerDesc[this] = value;
        }
        public CustomerCustomerDemoRow()
        {
        }

        public CustomerCustomerDemoRow(RowFields fields)
            : base(fields)
        {
        }

        public class RowFields : RowFieldsBase
        {
            public Int32Field ID;
            public StringField CustomerID;
            public StringField CustomerTypeID;

            public StringField CustomerCompanyName;
            public StringField CustomerContactName;
            public StringField CustomerContactTitle;
            public StringField CustomerAddress;
            public StringField CustomerCity;
            public StringField CustomerRegion;
            public StringField CustomerPostalCode;
            public StringField CustomerCountry;
            public StringField CustomerPhone;
            public StringField CustomerFax;

            public StringField CustomerTypeCustomerDesc;
        }
    }
}