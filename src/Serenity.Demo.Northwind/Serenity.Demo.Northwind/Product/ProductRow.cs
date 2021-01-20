using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using System.IO;

namespace Serenity.Demo.Northwind.Entities
{
    [ConnectionKey("Northwind"), Module("Northwind"), TableName("Products")]
    [DisplayName("Products"), InstanceName("Product")]
    [ReadPermission(PermissionKeys.General)]
    [ModifyPermission(PermissionKeys.General)]
    [LookupScript]
    [CaptureLog(typeof(ProductLogRow))]
    [LocalizationRow(typeof(ProductLangRow))]
    public sealed class ProductRow : Row<ProductRow.RowFields>, IIdRow, INameRow
    {
        [DisplayName("Product Id"), Identity, LookupInclude, IdProperty]
        public int? ProductID
        {
            get => fields.ProductID[this];
            set => fields.ProductID[this] = value;
        }

        [DisplayName("Product Name"), Size(40), NotNull, QuickSearch, LookupInclude, NameProperty]
        public string ProductName
        {
            get => fields.ProductName[this];
            set => fields.ProductName[this] = value;
        }

        [DisplayName("Product Image"), Size(100)]
        [ImageUploadEditor(FilenameFormat = "ProductImage/~", CopyToHistory = true)]
        public string ProductImage
        {
            get => fields.ProductImage[this];
            set => fields.ProductImage[this] = value;
        }

        [DisplayName("Discontinued"), NotNull, DefaultValue(false)]
        public bool? Discontinued
        {
            get => fields.Discontinued[this];
            set => fields.Discontinued[this] = value;
        }

        [DisplayName("Supplier"), ForeignKey(typeof(SupplierRow)), LeftJoin("sup")]
        [LookupEditor(typeof(SupplierRow), InplaceAdd = true, DialogType = "Demo.Northwind.SupplierDialog")]
        public int? SupplierID
        {
            get => fields.SupplierID[this];
            set => fields.SupplierID[this] = value;
        }

        [DisplayName("Category"), ForeignKey(typeof(CategoryRow)), LeftJoin("cat"), LookupInclude]
        [LookupEditor(typeof(CategoryRow), InplaceAdd = true, DialogType = "Demo.Northwind.CategoryDialog")]
        public int? CategoryID
        {
            get => fields.CategoryID[this];
            set => fields.CategoryID[this] = value;
        }

        [DisplayName("Quantity Per Unit"), Size(20)]
        public string QuantityPerUnit
        {
            get => fields.QuantityPerUnit[this];
            set => fields.QuantityPerUnit[this] = value;
        }

        [DisplayName("Unit Price"), Scale(4), LookupInclude]
        public decimal? UnitPrice
        {
            get => fields.UnitPrice[this];
            set => fields.UnitPrice[this] = value;
        }

        [DisplayName("Units In Stock"), NotNull, DefaultValue(0), LookupInclude]
        public short? UnitsInStock
        {
            get => fields.UnitsInStock[this];
            set => fields.UnitsInStock[this] = value;
        }

        [DisplayName("Units On Order"), NotNull, DefaultValue(0)]
        public short? UnitsOnOrder
        {
            get => fields.UnitsOnOrder[this];
            set => fields.UnitsOnOrder[this] = value;
        }

        [DisplayName("Reorder Level"), NotNull, DefaultValue(0)]
        public short? ReorderLevel
        {
            get => fields.ReorderLevel[this];
            set => fields.ReorderLevel[this] = value;
        }

        [Origin("sup"), DisplayName("Supplier"), LookupInclude]
        public string SupplierCompanyName
        {
            get => fields.SupplierCompanyName[this];
            set => fields.SupplierCompanyName[this] = value;
        }

        [Origin("sup")]
        public string SupplierContactName
        {
            get => fields.SupplierContactName[this];
            set => fields.SupplierContactName[this] = value;
        }

        [Origin("sup")]
        public string SupplierContactTitle
        {
            get => fields.SupplierContactTitle[this];
            set => fields.SupplierContactTitle[this] = value;
        }

        [Origin("sup")]
        public string SupplierAddress
        {
            get => fields.SupplierAddress[this];
            set => fields.SupplierAddress[this] = value;
        }

        [Origin("sup")]
        public string SupplierCity
        {
            get => fields.SupplierCity[this];
            set => fields.SupplierCity[this] = value;
        }

        [Origin("sup")]
        public string SupplierRegion
        {
            get => fields.SupplierRegion[this];
            set => fields.SupplierRegion[this] = value;
        }

        [Origin("sup")]
        public string SupplierPostalCode
        {
            get => fields.SupplierPostalCode[this];
            set => fields.SupplierPostalCode[this] = value;
        }

        [Origin("sup")]
        public string SupplierCountry
        {
            get => fields.SupplierCountry[this];
            set => fields.SupplierCountry[this] = value;
        }

        [Origin("sup")]
        public string SupplierPhone
        {
            get => fields.SupplierPhone[this];
            set => fields.SupplierPhone[this] = value;
        }

        [Origin("sup")]
        public string SupplierFax
        {
            get => fields.SupplierFax[this];
            set => fields.SupplierFax[this] = value;
        }

        [Origin("sup")]
        public string SupplierHomePage
        {
            get => fields.SupplierHomePage[this];
            set => fields.SupplierHomePage[this] = value;
        }

        [Origin("cat"), DisplayName("Category")]
        public string CategoryName
        {
            get => fields.CategoryName[this];
            set => fields.CategoryName[this] = value;
        }

        [Origin("cat")]
        public string CategoryDescription
        {
            get => fields.CategoryDescription[this];
            set => fields.CategoryDescription[this] = value;
        }

        [Origin("cat")]
        public Stream CategoryPicture
        {
            get => fields.CategoryPicture[this];
            set => fields.CategoryPicture[this] = value;
        }
        public ProductRow()
        {
        }

        public ProductRow(RowFields fields)
            : base(fields)
        {
        }

        public class RowFields : RowFieldsBase
        {
            public Int32Field ProductID;
            public StringField ProductName;
            public StringField ProductImage;
            public BooleanField Discontinued;
            public Int32Field SupplierID;
            public Int32Field CategoryID;
            public StringField QuantityPerUnit;
            public DecimalField UnitPrice;
            public Int16Field UnitsInStock;
            public Int16Field UnitsOnOrder;
            public Int16Field ReorderLevel;

            public StringField SupplierCompanyName;
            public StringField SupplierContactName;
            public StringField SupplierContactTitle;
            public StringField SupplierAddress;
            public StringField SupplierCity;
            public StringField SupplierRegion;
            public StringField SupplierPostalCode;
            public StringField SupplierCountry;
            public StringField SupplierPhone;
            public StringField SupplierFax;
            public StringField SupplierHomePage;

            public StringField CategoryName;
            public StringField CategoryDescription;
            public StreamField CategoryPicture;
        }
    }
}