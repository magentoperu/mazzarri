<?php

namespace Blueskytechco\LayeredAjax\Plugins\Controller\Category;

use Blueskytechco\CustomCatalog\Helper\Data as Helper;

class View
{
	protected $_jsonHelper;
	protected $_moduleHelper;
    protected $helper;
    protected $request;

	public function __construct(
		\Magento\Framework\Json\Helper\Data $jsonHelper,
        Helper $helper,
        \Magento\Framework\App\Request\Http $request,
		\Blueskytechco\LayeredAjax\Helper\Data $moduleHelper
	){
		$this->_jsonHelper = $jsonHelper;
        $this->helper = $helper;
        $this->request = $request;
		$this->_moduleHelper = $moduleHelper;
	}
    public function afterExecute(\Magento\Catalog\Controller\Category\View $action, $page)
	{
		if($this->_moduleHelper->isEnabled() && $action->getRequest()->getParam('isAjax')){
            $page_load_more = false;
            $params = $this->request->getParams();
            if($this->helper->getData('themesetting/category/load_more_ajax') != ''){
                $page_load_more = $this->helper->getData('themesetting/category/load_more_ajax');
            }
            
            if(isset($params['load-more']) && $params['load-more']){
                $page_load_more = $params['load-more'];
            }

            if ($page_load_more && ( $page_load_more == 'button' || $page_load_more == 'scroll' )) {
                $page_load_more = $page_load_more;
            }

			$navigation = $page->getLayout()->getBlock('catalog.leftnav');
			$products = $page->getLayout()->getBlock('category.products');
			$result = ['products' => $products->toHtml(), 'navigation' => $navigation->toHtml(), 'page_load_more' => $page_load_more];
			$action->getResponse()->representJson($this->_jsonHelper->jsonEncode($result));
		} else {
			return $page;
		}
    }
}
